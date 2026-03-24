// src/controllers/systemDesignController.ts
import { Request, Response } from 'express';
import logger from '@/util/logger';
import Blog from '@/models/Blog';
import fs from 'fs/promises';
import path from 'path';
import { storeFile, generateFilename } from '@/util/storage/storageClients';
// import { deleteImageFromStorage } from '@/util/imageStorage';
import slugify from 'slugify';

// GET all system design articles (with filtering and pagination)
export const getBlogs = async (req: Request, res: Response) => {
    try {
        const { category, tag, author, page = 1, limit = 10, published } = req.query;
        
        const filter: any = {};
        
        if (category) filter.category = category;
        if (tag) filter.tags = tag;
        if (author) filter.author = author;
        if (published !== undefined) filter.isPublished = published === 'true';
        
        const skip = (Number(page) - 1) * Number(limit);
        
        const designs = await Blog.find(filter)
            .populate('author', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .select('-content'); // Exclude content for list view
        
        const total = await Blog.countDocuments(filter);
        
        res.json({
            success: true,
            data: designs,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
    } catch (err) {
        logger.error(`Error fetching system designs: ${err}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET single system design by Slug
export const getBlogBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        
        const blog = await Blog.findOne({ slug: slug })
            .populate('author', 'username email');
        
        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog not found' });
            return;
        }
        
        // Increment views
        blog.views += 1;
        await blog.save();
        
        res.json({
            success: true,
            data: blog
        });
    } catch (err) {
        logger.error(`Error fetching system design: ${err}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST create new system design
export const createBlog = async (req: Request, res: Response) => {
    try {
        const { title, description, category, tags, coverImage, isPublished, visibility } = req.body;
        
        // You would get userId from JWT token in real implementation
        console.log(req.body);
        const { userId } = req.body;
        console.log(userId);

        if (!userId) {
            res.status(400).json({ success: false, message: 'User ID is required' });
            return;
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Blog content file is required'
            });
        }

        const filename = generateFilename(req.file.originalname);
        
        const contentRef = await storeFile({
            folder: 'blog',
            filename,
            buffer: req.file.buffer,
            contentType: req.file.mimetype
        });

        const slug = slugify(title, { lower: true, strict: true })

        const newBlog = new Blog({
            title,
            description,
            author: userId,
            category,
            tags: tags || [],
            contentRef,
            coverImage: coverImage || null,
            slug,
            isPublished: isPublished,
            visibility: visibility ?? 'public',
        });
        
        await newBlog.save();
        
        const populated = await Blog.findById(newBlog._id)
            .populate('author', 'username email');
        
        res.status(201).json({
            success: true,
            data: populated
        });
    } catch (err) {
        logger.error(`Error creating new blog: ${err}`);
        res.status(500).json({ success: false, message: 'Failed to create new blog' });
    }
};

// PUT update system design
export const updateBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        // Remove fields that shouldn't be updated directly
        delete updates.views;
        delete updates.likes;
        delete updates.author;
        
        const updated = await Blog.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).populate('author', 'username email');
        
        if (!updated) {
            res.status(404).json({ success: false, message: 'System design not found' });
            return;
        }
        
        res.json({
            success: true,
            data: updated
        });
    } catch (err) {
        logger.error(`Error updating system design: ${err}`);
        res.status(500).json({ success: false, message: 'Failed to update system design' });
    }
};

// DELETE blog
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const blog = await Blog.findById(id);
        
        if (!blog) {
            res.status(404).json({ success: false, message: 'blog not found' });
            return;
        }
        
        // Delete associated images
        // for (const block of blog.content) {
        //     if (block.type === 'image' && block.content.startsWith('/uploads/')) {
        //         try {
        //             const imagePath = path.join(process.cwd(), 'public', block.content);
        //             await fs.unlink(imagePath);
        //         } catch (err) {
        //             logger.warn(`Failed to delete image: ${block.content}`);
        //         }
        //     }
        // }
        
        // Delete cover image if exists
        if (blog.coverImage && blog.coverImage.startsWith('/uploads/')) {
            try {
                const coverPath = path.join(process.cwd(), 'public', blog.coverImage);
                await fs.unlink(coverPath);
            } catch (err) {
                logger.warn(`Failed to delete cover image: ${blog.coverImage}`);
            }
        }
        
        await Blog.findByIdAndDelete(id);
        
        res.json({
            success: true,
            message: 'System design deleted successfully'
        });
    } catch (err) {
        logger.error(`Error deleting system design: ${err}`);
        res.status(500).json({ success: false, message: 'Failed to delete system design' });
    }
};

// POST like a system design
export const likeBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const design = await Blog.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }
        ).select('likes');
        
        if (!design) {
            res.status(404).json({ success: false, message: 'System design not found' });
            return;
        }
        
        res.json({
            success: true,
            likes: design.likes
        });
    } catch (err) {
        logger.error(`Error liking system design: ${err}`);
        res.status(500).json({ success: false, message: 'Failed to like system design' });
    }
};

// POST upload image for system design
export const uploadImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: 'No file uploaded' });
            return;
        }
        
        // imageUrl is set by the upload middleware (either local path or R2 URL)
        const imageUrl = (req as any).imageUrl;
        console.log(imageUrl);
        
        res.status(200).json({
            success: true,
            imageUrl,
            message: 'Image uploaded successfully'
        });
    } catch (err) {
        logger.error(`Error uploading image: ${err}`);
        res.status(500).json({ success: false, message: 'Failed to upload image' });
    }
};

// GET search system designs
export const searchBlogs = async (req: Request, res: Response) => {
    try {
        const { q, page = 1, limit = 10 } = req.query;
        
        if (!q) {
            res.status(400).json({ success: false, message: 'Search query is required' });
            return;
        }
        
        const skip = (Number(page) - 1) * Number(limit);
        
        const designs = await Blog.find(
            { $text: { $search: q as string }, isPublished: true },
            { score: { $meta: 'textScore' } }
        )
            .populate('author', 'username email')
            .sort({ score: { $meta: 'textScore' } })
            .skip(skip)
            .limit(Number(limit))
            .select('-content');
        
        const total = await Blog.countDocuments({
            $text: { $search: q as string },
            isPublished: true
        });
        
        res.json({
            success: true,
            data: designs,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
    } catch (err) {
        logger.error(`Error searching system designs: ${err}`);
        res.status(500).json({ success: false, message: 'Search failed' });
    }
};