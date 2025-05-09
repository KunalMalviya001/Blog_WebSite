import React, { useState, useCallback, useEffect } from "react";
import { Button, Input, RTE, Select } from "..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function PostForm({ post }) {
    const navigate = useNavigate();
    const UserId = useSelector((state) => state.auth.userData._id);

    // State variables
    const [title, setTitle] = useState(post?.title || '');
    const [slug, setSlug] = useState(post?.slug || '');
    const [content, setContent] = useState(post?.content || '');
    const [status, setStatus] = useState(post?.status || 'active');
    const [featuredImage, setImage] = useState(null);
    const userId = useSelector((state) => state.auth.userData?._id);

    // Slug transformer
    const slugTransform = useCallback((value) => {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s+/g, "-");
    }, []);

    // Update slug when title changes
    useEffect(() => {
        setSlug(slugTransform(title));
    }, [title, slugTransform]);

    // Submit handler
    const submit = async (e) => {
        e.preventDefault();

        try {
            if (post) {
                let featuredImageModified = true;
                // Updating an existing post
                if (featuredImage == null) {
                    setImage(undefined);
                    featuredImageModified = false;
                }
                const formData = new FormData();
                formData.append("title", title);
                formData.append("content", content);
                formData.append("status", status);
                formData.append("UserId", userId);
                formData.append("featuredImageModified", featuredImageModified);
                formData.append("blogId", post._id);
                if (featuredImage) {
                    formData.append("featuredImage", featuredImage);
                }

                await axios.put("/api/editBlog", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // console.log("Post updated:", response.data);
                navigate(`/post/${post._id}`);
            } else {
                // Creating a new post
                const formData = new FormData();
                formData.append('title', title);
                // formData.append('slug', slug);
                formData.append('content', content);
                formData.append('status', status);
                formData.append('UserId', UserId);
                if (featuredImage) {
                    formData.append('featuredImage', featuredImage);
                }

                const response = await axios.post("/api/createBlog", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                console.log("Post created:", response.data);
                navigate(`/post/${response.data._id}`);
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    return (
        <form onSubmit={submit} className="flex flex-wrap">
            {/* Left Section: Text Inputs */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    value={slug}
                    onChange={(e) => setSlug(slugTransform(e.target.value))}
                />

                <RTE label="Content :" value={content} onChange={setContent} />
            </div>

            {/* Right Section: Image and Status */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                {/* Show existing image if in edit mode */}
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    label="Status"
                    options={["active", "inactive"]}
                    className="mb-4"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
