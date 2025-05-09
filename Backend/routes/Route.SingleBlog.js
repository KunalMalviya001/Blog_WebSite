import express from 'express';
import Blog from '../models/Model.Blog.js';

const router = express.Router();

// GET all examples
router.get('/', async (req, res) => {
    const slug = req.query.slug; // Get the slug from the query parameters
    const blog = await Blog.findById(slug);
    if (!blog) {
        return res.status(401).json({ message: 'No blog found' });
    }
    res.status(200).json(blog);
});

export default router;