// src/util/imageStorage.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import logger from '@/util/logger';

// const isProduction = process.env.NODE_ENV === 'production';
const isProduction = true;
// ========================================
// LOCAL STORAGE SETUP
// ========================================
const uploadDir = path.join(__dirname, "../../uploads");
const blogDir = path.join(uploadDir, "blog");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
}

const localStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, blogDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        const sanitizedBasename = basename.replace(/[^a-zA-Z0-9]/g, '-');
        cb(null, `${sanitizedBasename}-${uniqueSuffix}${ext}`);
    },
});

// ========================================
// CLOUDFLARE R2 SETUP
// ========================================
let r2Client: S3Client | null = null;

if (isProduction) {
    // Initialize R2 client for production
    r2Client = new S3Client({
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID!,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
    });
}

// ========================================
// MEMORY STORAGE FOR R2 (temp storage before upload)
// ========================================
const memoryStorage = multer.memoryStorage();

// ========================================
// FILE FILTER
// ========================================
const imageFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, svg)'));
    }
};

// ========================================
// MULTER SETUP
// ========================================
const multerInstance = multer({
    storage: isProduction ? memoryStorage : localStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: imageFilter
});

// ========================================
// UPLOAD MIDDLEWARE
// ========================================
export const uploadImage = [
    multerInstance.single('image'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                return next();
            }

            if (isProduction && r2Client) {
                // Upload to Cloudflare R2
                const uniqueFilename = `blog/${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(req.file.originalname)}`;
                
                const command = new PutObjectCommand({
                    Bucket: process.env.R2_BUCKET_NAME!,
                    Key: uniqueFilename,
                    Body: req.file.buffer,
                    ContentType: req.file.mimetype,
                });

                console.log(command);

                await r2Client.send(command);

                // R2 public URL
                const imageUrl = `${process.env.R2_PUBLIC_URL}/${uniqueFilename}`;
                
                // Attach imageUrl to request for controller to use
                (req as any).imageUrl = imageUrl;
                
                logger.info(`Image uploaded to R2: ${imageUrl}`);
            } else {
                // Local storage - file is already saved by multer
                const imageUrl = `/uploads/blog/${req.file.filename}`;
                (req as any).imageUrl = imageUrl;
                
                logger.info(`Image uploaded locally: ${imageUrl}`);
            }

            next();
        } catch (error) {
            logger.error(`Error in upload middleware: ${error}`);
            next(error);
        }
    }
];

// ========================================
// DELETE IMAGE FUNCTION
// ========================================
export async function deleteImageFromStorage(imageUrl: string): Promise<void> {
    try {
        if (isProduction && r2Client && imageUrl.includes(process.env.R2_PUBLIC_URL || '')) {
            // Delete from R2
            const urlObj = new URL(imageUrl);
            const key = urlObj.pathname.substring(1); // Remove leading slash

            const command = new DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: key,
            });

            await r2Client.send(command);
            logger.info(`Image deleted from R2: ${key}`);
        } else if (imageUrl.startsWith('/uploads/')) {
            // Delete from local storage
            const imagePath = path.join(process.cwd(), 'public', imageUrl);
            await fs.promises.unlink(imagePath);
            logger.info(`Image deleted locally: ${imagePath}`);
        }
    } catch (error) {
        logger.warn(`Failed to delete image: ${imageUrl}`, error);
    }
}