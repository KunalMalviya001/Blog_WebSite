import React from 'react';
// import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import CloudImage from './CloudImage.jsx'; // Import CloudImage component for optimized image loading

// PostCard component displays a preview of a post.
// It includes the post's title and featured image, and links to the full post.
function PostCard({ _id, title, featuredImage }) {

  function extractPublicId(url) {
    const match = url.match(/upload\/(?:v\d+\/)?(.+?)\.(webp|jpg|jpeg|png|gif)$/);
    return match ? match[1] : null;
  }
  const publicId = extractPublicId(featuredImage); // Extract public ID from URL

  return (
    <Link to={`/post/${_id}`}> {/* Link to the full post using its ID */}
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        {/* Featured image section */}
        <div className='w-full justify-center mb-4'>
          <CloudImage imgPath={publicId}/> {/* Use the CloudImage component for optimized image loading */}
        </div>
        {/* Post title */}
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;