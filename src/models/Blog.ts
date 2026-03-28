// src/models/Blog.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export type BlogVisibility = 'public' | 'friends' | 'own';


export interface IBlog extends Document {
    title: string;
    description: string;
    author: mongoose.Types.ObjectId;
    category: string; // e.g., "Microservices", "Database Design", "Scalability"
    tags: string[];
    contentRef: string; // Rich text content with images
    coverImage?: string; // Optional cover image URL
    slug: string;
    views: number;
    likes: number;
    isPublished: boolean;
    visibility: BlogVisibility;
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema: Schema<IBlog> = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 500
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: [
                'OOD',
                'Microservices',
                'Database Design',
                'Scalability',
                'Load Balancing',
                'Caching',
                'Message Queues',
                'API Design',
                'Security',
                'Cloud Architecture',
                'Other'
            ]
        },
        tags: {
            type: [String],
            default: []
        },
        contentRef: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,
            default: null
        },
        slug: {
            type: String, 
            unique: true, // Prevents two blogs from having the same URL
            index: true,  // Makes searching by slug extremely fast
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        likes: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        visibility: {
            type: String,
            enum: ['public', 'friends', 'own'],
            default: 'public',
            required: true
        },

    },
    {
        timestamps: true,
        collection: 'blog'
    }
);

// Index for better query performance
blogSchema.index({ title: 'text', description: 'text', tags: 'text' });
blogSchema.index({ category: 1, isPublished: 1 });
blogSchema.index({ author: 1 });

const Blog: Model<IBlog> = mongoose.model<IBlog>(
    'Blog',
    blogSchema,
    'blog'
);

export default Blog;