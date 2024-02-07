const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUsers=async(req, res)=>{
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

const signUp=async(req,res)=>{
  const { username, email, password, user_type } = req.body;
try {
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10); 
  await userModel.createUser(username, email, hashedPassword, user_type);
  let userTypeMessage;
  if (user_type === 'Parking Provider') {
    userTypeMessage = 'Parking Provider';
  } else if (user_type === 'Parker') {
    userTypeMessage = 'Parker';
  } else {
    userTypeMessage = 'User';
  }
  res.status(201).json({ message: `${userTypeMessage} created successfully` });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server Error' });
}
}

const login=async(req,res)=>{

  const {email,password}=req.body;
  try{
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch=await bcrypt.compare(password,user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
module.exports = { getUsers,signUp ,login};
