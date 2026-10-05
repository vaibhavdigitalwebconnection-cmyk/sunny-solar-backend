import { Router } from 'express';
import {
  getPublishedKnowledge,
  getKnowledgeBySlug,
  getAllKnowledgeAdmin,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge,
  togglePublishKnowledge,
  restoreKnowledge
} from '../controllers/knowledge.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Admin routes (must be registered before parametric /:slug)
router.get('/admin/all', protect, getAllKnowledgeAdmin);

// Public routes
router.get('/', getPublishedKnowledge);
router.get('/:slug', getKnowledgeBySlug);
router.post('/', protect, createKnowledge);
router.put('/:id', protect, updateKnowledge);
router.patch('/:id/publish', protect, togglePublishKnowledge);
router.patch('/:id/restore', protect, restoreKnowledge);
router.delete('/:id', protect, deleteKnowledge);

export default router;
