import express from 'express';
import Blog from '../models/Model.Blog.js';

const router = express.Router();

// GET all examples
router.get('/', async (req, res) => {
    const blog = await Blog.find({});
    if (!blog) {
        return res.status(404).json({ message: 'No blog found' });
    }
    res.status(200).json(blog);
});

export default router;
