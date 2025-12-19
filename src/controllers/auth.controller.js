import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../utils/generateToken.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const nameRegex = /^[a-zA-Z. ]+$/;
  const emailRegex = /^[a-z0-9!#\( %&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!# \)%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%])[A-Za-z\d!@#%]{8,}$/;
  
  
  if(!nameRegex.test(name)) return res.status(400).send("Name is not valid");
  if(!emailRegex.test(email)) return res.status(400).send('Invalid email');
  if(!passwordRegex.test(password)) return res.status(400).send('Invalid password');
  
  try {
    const userExists = await User.findOne({ email: email });
    if(userExists) return res.status(400).json({ msg: "Email already exists" });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    
    const token = generateToken(user._doc._id, res);
    res.status(201).json({ status: "success", data: { ...user._doc }, token });
  } catch (error) {
    res.sendStatus(500);
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if(!user) return res.status(401).json({ msg: "Invalid email or password" });
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.status(401).json({ msg: "Invalid email or password" });
    
    const token = generateToken(user._doc._id, res);
    res.status(200).json({ status: "success", data: { ...user._doc }, token })
  } catch (error) {
    res.sendStatus(500);
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

const logout = async (req, res) => {
  res.cookie('user_token', '', {
    httpOnly: true,
    expires: new Date(),
  });
  res.json({ status: 'success', message: 'Successfully logged out' })
};

export { register, login, logout };