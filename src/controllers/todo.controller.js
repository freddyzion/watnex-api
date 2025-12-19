import { Todo, Category } from '../models/todo.model.js';
import User from '../models/user.model.js';

// Handles todos fetching from database
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

const getTodosByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const todos = await Todo.find({ author: req.user.id, category: categoryId });
    res.status(200).json({ status: "success", data: todos });
  } catch (error) {
    res.sendStatus(500);
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

// Handles task creation
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

// Handles task updates
const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: req.body, },
      {
        new: true,
        runValidators: true,
      },
    );
    if(!updatedTodo) return res.status(404).json({ message: 'Task not found' });
    res.status(201).json({ status: 'success', data: { ...updatedTodo._doc } });
  } catch (error) {
    res.sendStatus(500);
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

// Handles task deletion
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedTask = await Todo.findByIdAndDelete(id);
    if(!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ status: 'success', message: 'Task deleted successfully' })
  } catch (error) {
    res.sendStatus(500);
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

export {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getTodosByCategory,
};