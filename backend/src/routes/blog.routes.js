import { Router } from 'express';
import {
  getPublishedBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
  togglePublishBlog,
  restoreBlog
} from '../controllers/blog.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Admin routes (must be registered before parametric /:slug)
router.get('/admin/all', protect, getAllBlogsAdmin);

// Public routes
router.get('/', getPublishedBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.patch('/:id/publish', protect, togglePublishBlog);
router.patch('/:id/restore', protect, restoreBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
