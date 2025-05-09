import React from "react";
import { Logo, Container, LogoutBtn } from "../index.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Header component provides the navigation bar for the application.
// It dynamically adjusts navigation links based on the user's authentication status.
function Header() {
  // Get the authentication status from the Redux store
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Define navigation items with their names, routes, and visibility based on auth status
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true, // Always visible
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, // Visible only when the user is not authenticated
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus, // Visible only when the user is not authenticated
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus, // Visible only when the user is authenticated
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus, // Visible only when the user is authenticated
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      {/* Container ensures consistent layout and spacing */}
      <Container>
        <nav className="flex">
          {/* Logo section */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="70 px" />
            </Link>
          </div>
          {/* Navigation links */}
          <ul className="flex ml-auto items-center font-bold">
            {navItems.map((item) =>
              item.active || item.Active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)} // Navigate to the route on click
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null // Render only active items
            )}
            {/* Logout button, visible only when the user is authenticated */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;