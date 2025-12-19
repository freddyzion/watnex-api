import { Todo, Category } from '../models/todo.model.js';
import User from '../models/user.model.js';

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ author: req.user.id });
    res.status(200).json({ status: "success", data: todos });
  } catch (error) {
    res.sendStatus(500);
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

const addTodo = async (req, res) => {
  const { name, due_date, is_completed, category } = req.body;
  
  try {
    const todoExists = await Todo.findOne({ name });
    if(todoExists) return res.status(400).json({ message: 'Todo already exists' });
    
    const author = await User.findOne({ _id: req.user.id })
    const categoryId = await Category.findOne({ name: category })
    const newTodo = await Todo.create({
      name,
      due_date,
      is_completed,
      author: author._id,
      category: categoryId._id,
    });
    res.status(201).json({ status: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

const updateTodo = async (req, res) => {
  
};

const deleteTodo = async (req, res) => {
  
};

export {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};