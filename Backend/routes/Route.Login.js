import express from 'express';
import ModelLogin from '../models/Model.Login.js'; // Import the Login model
import jwt from 'jsonwebtoken'; // Import JWT for token generation
const router = express.Router();
import dotenv from 'dotenv'; // Import dotenv for environment variables

// POST /api/login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await ModelLogin.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "Login successful", user });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
