import express from "express";
import ModelBlog from "../models/Model.Blog.js";
import {uploadOnCloudinary} from "../utiility/cloudinary.js"

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const { title, content, status, UserId } = req?.body;
        const featuredImagePath = req.file?.path;
        // console.log("featuredImagePath", featuredImagePath);

        if (!title || !content || !featuredImagePath) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const featuredImage = await uploadOnCloudinary(featuredImagePath); // Fix: await the upload function
        if(!featuredImage){
            return res.status(500).json({ message: "Error uploading image" });
        }

        const newBlog = new ModelBlog({
            title,
            content,
            featuredImage : featuredImage.url, // Fix: use the URL from the upload result
            status,
            UserId,
        });

        const savedBlog = await newBlog.save(); // Fix: save it and store result
        res.status(201).json(savedBlog);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
