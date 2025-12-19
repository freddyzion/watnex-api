import { Category } from '../models/Category.model.js';
import User from '../models/user.model.js';

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json({ status: "success", data: categories });
  } catch (error) {
    res.sendStatus(500);
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

const addCategory = async (req, res) => {
  const { name } = req.body;
  
  try {
    const categoryExists = await Category.findOne({ name });
    if(categoryExists) return res.status(400).json({ message: 'Category already exists' });
    
    const user = await User.findOne({ _id: req.user.id });
    await Category.create({
      name,
      user: user._id,
    });
    res.status(201).json({ status: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};


const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: req.body, },
      {
        new: true,
        runValidators: true,
      },
    );
    if(!updatedCategory) return res.status(404).json({ message: 'Category not found' });
    res.status(201).json({ status: 'success' });
  } catch (error) {
    res.sendStatus(500);
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if(!deletedCategory) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ status: 'success', message: 'Category deleted successfully' })
  } catch (error) {
    res.sendStatus(500);
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

export {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};