import express from 'express';
import Blog from '../models/Model.Blog.js';
import { deleteOnCloudinary} from '../utiility/cloudinary.js'; 

const router = express.Router();

const DeleteBlog = router.post('/', async (req, res) => {
    const { id } = req.body; // Correctly extract 'id' from body
    if (!id) {
        return res.status(400).json({ message: 'Blog ID is required' });
    }

    try {
        const blogToDelete = await Blog.findById(id); // Find the blog by ID to get the current image URL
        if (!blogToDelete) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        const publicdelete = deleteOnCloudinary(blogToDelete?.featuredImage); // Extract public ID from URL
        if (!publicdelete) {
            return res.status(500).json({ message: "Error deleting image" });
        }
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default DeleteBlog;
