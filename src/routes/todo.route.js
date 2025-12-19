import express from 'express';
import { getTodos, addTodo, updateTodo, deleteTodo, getTodosByCategory } from '../controllers/todo.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTodos);
router.get('/:categoryId', getTodosByCategory);
router.post('/', addTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;