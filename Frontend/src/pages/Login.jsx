import React from 'react';
import { Login as LoginComponent } from '../components';

// Login page renders the LoginComponent.
// It provides a simple layout with padding for consistent spacing.
function Login() {
    return (
        <div className='py-8'>
            {/* Render the LoginComponent for user authentication */}
            <LoginComponent />
        </div>
    );
}

export default Login;