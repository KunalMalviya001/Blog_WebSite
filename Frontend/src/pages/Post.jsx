import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import axios from "axios";
import CloudImage from "../components/CloudImage.jsx"; // Import CloudImage component for optimized image loading



// Post page displays the details of a single post.
// It allows the author to edit or delete the post and renders the post content.
export default function Post() {
    const [post, setPost] = useState(null); // State to store the post data
    const { slug } = useParams(); // Get the slug parameter from the URL
    const navigate = useNavigate(); // Hook for programmatic navigation

    const userData = useSelector((state) => state.auth.userData); // Get the current user data from Redux

    // Check if the current user is the author of the post
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            // Fetch the post data using the slug
            // appwriteService.getPost(slug).then((post) => {
            //     if (post) setPost(post); // Update the state with the fetched post
            //     else navigate("/"); // Redirect to home if the post is not found
            // });
            axios.get("/api/singelBlog", { params: { slug } })
            .then((response) => {
                const data = response.data; // Extract data from the response
                if (!data) {
                    navigate("/"); // If no data, exit early
                }
                setPost(data); // Update the state with the fetched posts
            })
            .catch((error) => {
                console.error("Error fetching posts:", error); // Log any errors
            });

        } else navigate("/"); // Redirect to home if no slug is provided
    }, [slug, navigate]); // Dependency array ensures this runs when slug or navigate changes

    // Function to handle post deletion
    const deletePost = () => {
        axios.post("/api/deleteBlog", { id: post._id })
        .then((response) => {
            const data = response.data; // Extract data from the response
            if (!data) {
                navigate("/"); // If no data, exit early
            }
            navigate("/"); // Redirect to home after deletion
        })
    };


    function extractPublicId(url) {
        const match = url.match(/upload\/(?:v\d+\/)?(.+?)\.(webp|jpg|jpeg|png|gif)$/);
        return match ? match[1] : null;
      }
      const publicId = post ? extractPublicId(post.featuredImage) : null; // Extract public ID from URL

    return post ? (
        <div className="py-8">
            <Container>
                {/* Post image section */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <CloudImage imgPath={publicId}/> {/* Use the CloudImage component for optimized image loading */}

                    {/* Edit and Delete buttons, visible only to the author */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                {/* Post content */}
                <div className="browser-css">
                    {parse(post.content)} {/* Parse and render the HTML content */}
                </div>
            </Container>
        </div>
    ) : null; // Render nothing if the post data is not yet available
}