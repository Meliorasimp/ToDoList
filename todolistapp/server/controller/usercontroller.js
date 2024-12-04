import usermodel from "../model/usermodel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret";

export const postuser = async(req, res) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password) {
    return res.status(400).json('Please enter all fields');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new usermodel({
      username:username,
      email:email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json('User registered successfully');
  } catch (error) {
    res.status(500).json({ success: false, message:'Server Error'});
  }
}

export const loginuser = async (req, res) => { 
  const { email, password } = req.body; 
    try { const User = await usermodel.findOne({ email }); 
    if (!User) { 
      return res.status(404).json('User not found'); 
    } 
    const isMatch = await bcrypt.compare(password, User.password); 
    if (!isMatch) { 
      return res.status(400).json('Invalid credentials'); 
    } 
    const payload = { User: { id: User._id, email: User.email, }, }; 
    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' }); 
    res.status(200).json({ token }); 
  } catch (error) { 
    res.status(500).json({ message: 'Server error' })
  }
}