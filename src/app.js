import express from 'express';
import authRoutes from './routes/auth.route.js';
import todoRoutes from './routes/todo.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

export default app;