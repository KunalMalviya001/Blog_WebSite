import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
// import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// EditPost page allows users to edit an existing post.
// It fetches the post data based on the slug and pre-fills the PostForm component.
function EditPost() {
    const [post, setPosts] = useState(null); // State to store the post data
    const { slug } = useParams(); // Get the slug parameter from the URL
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        if (slug) {
            axios.get("/api/singelBlog", { params: { slug } })
                .then((response) => {
                    let data = response.data;
                    
                    if (!data) {
                        navigate("/");
                    }
                    
                    setPosts(data);
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]); // Fetch post data when the slug changes
    
    return post ? (
        <div className='py-8'>
            {/* Container ensures consistent spacing and layout */}
            <Container>
                {/* PostForm pre-filled with the post data for editing */}
                <PostForm post={post} />
            </Container>
        </div>
    ) : null; // Render nothing if the post data is not yet available
}

export default EditPost;