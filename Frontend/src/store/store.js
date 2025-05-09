import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

// Configure the Redux store
const store = configureStore({
    reducer: {
        auth: authSlice, // Authentication slice for managing user authentication state
    }
});

export default store; // Export the store for use in the application