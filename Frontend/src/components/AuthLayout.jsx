import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Protected component acts as a layout wrapper to protect routes based on authentication status.
// It redirects users to appropriate routes based on their authentication state.
export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [loader, setLoader] = useState(true); // State to manage the loading indicator
    const authStatus = useSelector((state) => state.auth.status); // Get authentication status from Redux store

    useEffect(() => {
        // Check the authentication status and redirect accordingly
        if (authentication && authStatus !== authentication) {
            // If authentication is required but the user is not authenticated, redirect to login
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            // If authentication is not required but the user is authenticated, redirect to home
            navigate("/");
        }
        setLoader(false); // Stop the loader once the check is complete
    }, [authStatus, navigate, authentication]);

    // Show a loading indicator while the authentication check is in progress
    return loader ? <h1>Loading...</h1> : <>{children}</>;
}