import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../../store/authSlice';

// LogoutBtn component handles user logout functionality.
// It interacts with the authentication service and updates the Redux store.
function LogoutBtn() {
    const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

    // Handler function to log out the user
    // const logoutHandler = () => {
    //     authService.logout().then(() => {
    //         dispatch(logout()); // Dispatch the logout action to update the auth state
    //     });
    // };
    const logoutHandler = () => {
        axios.post("/api/logout")
            .then(() => {
                // console.log("Logout response:", response.data); // Log the response for debugging
                dispatch(logout()); // Dispatch the logout action to update the auth state
            })
            .catch((error) => {
                console.error("Error logging out:", error); // Log any errors
            });
    };




    return (
        <button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler} // Trigger the logout handler on click
        >
            Logout
        </button>
    );
}

export default LogoutBtn;