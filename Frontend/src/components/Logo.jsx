import React from 'react';

// Logo component displays the application's logo.
// It accepts a customizable width for flexibility in different layouts.
function Logo({ width = '100px' }) {
  return (
    <div className={`${width} `}>
      {/* Render the logo image */}
      <img className="w-24" src="blog_logo.jpg" alt="logo" />
    </div>
  );
}

export default Logo;