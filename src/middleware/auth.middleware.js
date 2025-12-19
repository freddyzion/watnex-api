import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if(res.cookie?.jwt) {
    token = res.cookie.jwt;
  }
  
  if(!token) {
    return res.status(401).json({ message: 'Not authorized; no token provided' });
  }
  
  try {
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedToken.id });
    if(!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized; token failed' });
    if(process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
};

export default authMiddleware;