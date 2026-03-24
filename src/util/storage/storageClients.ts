// src/util/storageClient.ts
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// const isProduction = process.env.NODE_ENV === 'production';
const isPpe = process.env.NODE_ENV === 'ppe';
const uploadRoot = path.join(process.cwd(), 'uploads');

let r2Client: S3Client | null = null;

if (isPpe) {
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

export async function storeFile(params: {
    folder: string;
    filename: string;
    buffer: Buffer;
    contentType: string;
}): Promise<string> {
    const { folder, filename, buffer, contentType } = params;

    if (isPpe && r2Client) {
        const key = `${folder}/${filename}`;

        await r2Client.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: key,
                Body: buffer,
                ContentType: contentType
            })
        );

        return `${process.env.R2_PUBLIC_URL}/${key}`;
    }
    
    // local
    const dir = path.join(uploadRoot, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const fullPath = path.join(dir, filename);
    await fs.promises.writeFile(fullPath, buffer);

    return `/uploads/${folder}/${filename}`;
}

export function generateFilename(originalName: string) {
    const ext = path.extname(originalName);
    return `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
}