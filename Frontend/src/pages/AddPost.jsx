import React from 'react';
import { Container, PostForm } from '../components';

// AddPost page renders the form for creating a new post.
// It uses the PostForm component wrapped inside a Container for consistent layout.
function AddPost() {
  return (
    <div className='py-8'>
        {/* Container ensures consistent spacing and layout */}
        <Container>
            {/* PostForm handles the creation of a new post */}
            <PostForm />
        </Container>
    </div>
  );
}

export default AddPost;