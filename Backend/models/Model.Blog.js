import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, required: true },
    status: {type: String},
    UserId: {type: mongoose.Schema.Types.ObjectId, ref:"Login" , required: true},
})


const ModelBlog = mongoose.model("Blog", blogSchema);
export default ModelBlog;