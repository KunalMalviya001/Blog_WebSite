import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
});


const uploadOnCloudinary = async (localFilePAth) => {
    try {
        if (!localFilePAth) return null;
        // Upload file on cloudinary
        const resource = await cloudinary.uploader.upload(localFilePAth, {
            public_id:"blog/" + Date.now(), // Public ID for the uploaded image
            resource_type: "auto", // Automatically detect the resource type (image, video, etc.)
        })
        // file uploaded successfully
        // console.log("File uploaded", resource.url);
        
        // delete file from local storage
        fs.unlinkSync(localFilePAth);
        return resource;

    }catch (error) {
        fs.unlinkSync(localFilePAth);// delete file from local storage
        console.log(error)
        return null;
    }
}

const deleteOnCloudinary = async (featuredImage) => {
    try {
        function extractPublicId(url) {
            const match = url.match(/upload\/(?:v\d+\/)?(.+?)\.(webp|jpg|jpeg|png|gif)$/);
            return match ? match[1] : null;
        }
        const publicId = extractPublicId(featuredImage); // Extract public ID from URL
        if (publicId) {
            await cloudinary.uploader.destroy(publicId) // Delete image from Cloudinary
        }
    }catch (error) {
        console.log(error)
        return null;
    }
}

export { uploadOnCloudinary , deleteOnCloudinary };