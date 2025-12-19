import mongoose from 'mongoose';
import User from './user.model.js';

const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { 
    type: String,
    default: 'Uncategorized'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Category = model('Category', categorySchema);

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  due_date: {
    type: Date,
    required: true,
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Todo = model('Todo', todoSchema);

export { Todo, Category };