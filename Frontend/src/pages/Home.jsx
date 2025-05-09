import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { Container, PostCard } from '../components';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing location state

// Home page displays a list of posts fetched from the Appwrite service.
// If no posts are available, it shows a message prompting the user to log in or create posts.
function Home() {
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState(location.state?.success || "");
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);
    const userId = useSelector((state) => state.auth.userData?._id);

    useEffect(() => {
        if (authStatus === false) return;

        axios.get("/api/userBlog", { params: { slug: userId } })
            .then((response) => {
                const data = response.data;
                if (!data) return;

                const selectedData = data.map(({ _id, title, featuredImage }) => ({
                    _id,
                    title,
                    featuredImage
                }));

                setPosts(selectedData);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, [authStatus, userId]);

    // Automatically hide success message after 10 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 4000); // 10 seconds

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <div className="w-full py-8 mt-4 text-center">
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

            <Container>
                <div className="flex flex-wrap">
                    {posts.length === 0 ? (
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts available. Please log in or create a post.
                            </h1>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id + post.title} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}


export default Home;