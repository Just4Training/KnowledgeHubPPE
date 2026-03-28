// src/routes/systemDesign.ts
import express, { Request, Response, NextFunction } from 'express';
import { documentUpload } from '@/util/documentUpload';
import { uploadImage as uploadImageMiddleware } from '@/util/imageStorage';
import {
    getBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    uploadImage,
    searchBlogs
} from '@/controllers/blogController';

const router = express.Router();

// GET all system design articles with filtering
// Query params: category, tag, author, page, limit, published
router.get('/', getBlogs);

// GET search system designs
// Query params: q (search query), page, limit
router.get('/search', searchBlogs);

// GET single system design by slug
router.get('/:slug', getBlogBySlug);

// POST create new system design
router.post('/', documentUpload, createBlog);
// router.post(
//   '/',
//   (req: Request, _res: Response, next: NextFunction) => {
//     console.log('🔥 route hit BEFORE multer');
//     next();
//   },
//   documentUpload,
//   (_req: Request, _res: Response, next: NextFunction) => {
//     console.log('🔥 route hit AFTER multer');
//     next();
//   },
//   createBlog
// );

// PUT update system design
router.put('/:id', updateBlog);

// DELETE system design
router.delete('/:id', deleteBlog);

// POST like a system design
router.post('/:id/like', likeBlog);

// POST upload image for system design content
router.post('/upload/image', uploadImageMiddleware, uploadImage);

export default router;