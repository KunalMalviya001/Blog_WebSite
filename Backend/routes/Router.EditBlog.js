import express from "express";
import ModelBlog from "../models/Model.Blog.js";
import {
  uploadOnCloudinary,
  deleteOnCloudinary,
} from "../utiility/cloudinary.js";

const router = express.Router();

router.put("/", async (req, res) => {
  try {
    const { title, content, status, UserId, featuredImageModified, blogId } =
      req?.body;
    // console.log("req.body", req.body);
    // console.log("featuredImagePath", featuredImagePath);

    if (featuredImageModified) {
      const featuredImagePath = req.file?.path; // Use req.body for the image path if available
      if (!blogId) {
        return res.status(400).json({ message: "Blog ID is required" });
      }
      const deletedimageOnCloud = await ModelBlog.findById(blogId); // Find the blog by ID to get the current image URL
      if (!deletedimageOnCloud) {
        return res.status(404).json({ message: "Blog not found" });
      }
      const publicdelete = deleteOnCloudinary(
        deletedimageOnCloud?.featuredImage
      ); // Extract public ID from URL
      if (!publicdelete) {
        return res.status(500).json({ message: "Error deleting image" });
      }

      if (!title || !content || !featuredImagePath) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const featuredImage = await uploadOnCloudinary(featuredImagePath); // Fix: await the upload function
      if (!featuredImage) {
        return res.status(500).json({ message: "Error uploading image" });
      }

      const updateBlog = await ModelBlog.findByIdAndUpdate(
        blogId,
        {
          title,
          content,
          featuredImage: featuredImage.url, // Fix: use the URL from the upload result
          status,
          UserId,
        },
        { new: true }
      ); // Fix: use { new: true } to return the updated document
      const savedBlog = await updateBlog.save(); // Fix: save it and store result
      res.status(201).json(savedBlog);
    } else {
      if (!blogId) {
        return res.status(400).json({ message: "Blog ID is required" });
      }
      const updateBlog = await ModelBlog.findByIdAndUpdate(
        blogId,
        {
          title,
          content, // Fix: use the URL from the upload result
          status,
          UserId,
        },
        { new: true }
      ); // Fix: use { new: true } to return the updated document

      console.log("updateBlog");
      const savedBlog = await updateBlog.save(); // Fix: save it and store result
      res.status(201).json(savedBlog);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
