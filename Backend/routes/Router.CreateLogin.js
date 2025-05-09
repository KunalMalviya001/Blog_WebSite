import express from 'express';
import jwt from 'jsonwebtoken';
import ModelLogin from '../models/Model.Login.js'; // Import the Login model

const router = express.Router();


// GET all examples
const RouteCreateBlog = router.post('/', async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password)
    // if (!email || !password) return res.status(402).json({ message: 'Email and password are required' });

  try {
    // Check if user already exists
    const existingUser = await ModelLogin.findOne({ email });
    if (existingUser) return res.status(200).json({ message: "User created successfully" });

    // Create new user
    const newUser = new ModelLogin({ email, password });
    await newUser.save();

    // Create token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default RouteCreateBlog;
