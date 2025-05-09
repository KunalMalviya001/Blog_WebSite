import express from 'express';
import Blog from '../models/Model.Blog.js';

const router = express.Router();

// GET all examples
router.get('/', async (req, res) => {
    const UserId = req.query.slug; // Get the slug from the query parameters
    const blog = await Blog.find({ UserId: UserId }); // Find blogs by UserId and populate the UserId field with name and email
    if (!blog) {
        return res.status(401).json({ message: 'No blog found' });
    }
    res.status(200).json(blog);
});

export default router;