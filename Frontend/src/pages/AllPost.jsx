import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import axios from 'axios'; // Import axios for making HTTP requests

// AllPosts page fetches and displays a list of posts.
// It uses the PostCard component to render individual posts and the Container for consistent layout.
function AllPosts() {
    const [posts, setPosts] = useState([]); // State to store the list of posts
    

    useEffect(() => {
        // Fetch posts from the Appwrite service when the component mounts
        axios.get("/api/blog")
            .then((response) => {
                const data = response.data; // Extract data from the response
                if (!data) {
                    return; // If no data, exit early
                }

                const selectedData = data.map(({ _id, title, featuredImage }) => ({
                    _id,
                    title,
                    featuredImage
                  }));
                  
                //   console.log("selectedData", selectedData);
                   // Log the selected data for debugging

                
                setPosts(selectedData); // Update the state with the fetched posts
            })
            .catch((error) => {
                console.error("Error fetching posts:", error); // Log any errors
            });

    }, []); // Empty dependency array ensures this runs only once on mount


    return (
        <div className='w-full py-8'>
            {/* Container ensures consistent spacing and layout */}
            <Container>
                <div className='flex flex-wrap'>
                    {/* Map through the posts and render a PostCard for each post */}
                    {posts.map((post) => (
                        <div key={post.$id+post.title} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;