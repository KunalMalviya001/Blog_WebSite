import React from 'react';

// Container component serves as a wrapper to center and constrain the width of its children.
// It ensures consistent padding and maximum width for the content.
function Container({ children }) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container;