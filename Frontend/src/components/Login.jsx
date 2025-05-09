import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { login } from "../store/authSlice"; // Import the Login action from the Redux slice
// import { useForm } from "react-hook-form";

// Login component handles user authentication.
// It integrates with Appwrite for login and updates the Redux store with user data.

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("/api/login", {email: email, password: password});
        const data = response.data;
        if (!data) {
          setError("No user found");
          return;
        }
        dispatch(login({ userData: data.user })); // Dispatch the login action with user data
        
        navigate("/all-posts"); // Redirect to the all posts page after successful login
      } catch (error) {
        console.error("Error logging in:", error);
        setError("Invalid credentials");
      }
    };
  
    const validateEmail = (value) => {
        const isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
        setError(isValid ? '' : 'Enter a valid email address');
        setEmail(value);
      };


    return (
        <div className='flex items-center justify-center w-full'>
            {/* Login form container */}
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                {/* Logo section */}
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                {/* Title and signup link */}
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {/* Error message */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {/* Login form */}
                <form onSubmit={handleSubmit} className='mt-8'>
                    <div className='space-y-5'>
                        {/* Email input field */}
                        <Input
                           type="email"
                           placeholder="Enter your email"
                           value={email}
                           onChange={(e) => validateEmail(e.target.value)}
                           required
                        />
                        {/* Password input field */}
                        <Input
                            label="Password: "
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;