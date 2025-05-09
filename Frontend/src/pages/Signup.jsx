import React from 'react';
import { Signup as SignupComponent } from '../components';

// Signup page renders the SignupComponent.
// It provides a simple layout with padding for consistent spacing.
function Signup() {
  return (
    <div className='py-8'>
        {/* Render the SignupComponent for user registration */}
        <SignupComponent />
    </div>
  );
}

export default Signup;