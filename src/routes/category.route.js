import express from 'express';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getCategories);
router.post('/', addCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;