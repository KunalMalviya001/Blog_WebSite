import { createSlice } from "@reduxjs/toolkit";

// Initial state for the authentication slice
const initialState = {
    status: false, // Indicates whether the user is authenticated
    userData: null // Stores the authenticated user's data
}

// Create a Redux slice for authentication
const authSlice = createSlice({
    name: "auth", // Name of the slice
    initialState, // Initial state for the slice
    reducers: {
        // Reducer to handle user login
        login: (state, action) => {
            state.status = true; // Set authentication status to true
            state.userData = action.payload.userData; // Store the user's data
        },
        // Reducer to handle user logout
        logout: (state) => {
            state.status = false; // Set authentication status to false
            state.userData = null; // Clear the user's data
        }
    }
})

// Export the actions for use in components
export const { login, logout } = authSlice.actions;

// Export the reducer to be used in the Redux store
export default authSlice.reducer;