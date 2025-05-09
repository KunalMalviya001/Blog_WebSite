// Centralized export file for all components.
// This allows for cleaner and more organized imports throughout the application.

import Select from "./Select"; // Dropdown select component
import Header from "./Header/Header"; // Header component for navigation
import Footer from "./Footer/Footer"; // Footer component for branding and links
import Container from "./container/Container"; // Layout container for consistent spacing
import Logo from "./Logo"; // Logo component for branding
import LogoutBtn from "./Header/LogoutBtn"; // Logout button component
import RTE from "./RTE"; // Rich Text Editor component
import Signup from "./Signup"; // Signup form component
import Login from "./Login"; // Login form component
import PostForm from "./post-form/PostForm"; // Form for creating and editing posts
import PostCard from "./PostCard"; // Card component for displaying posts
import AuthLayout from "./AuthLayout"; // Layout wrapper for protected routes
import Input from "./Input"; // Input field component
import Button from "./Button";
 // Button component for actions


// Export all components for easy import in other files
export {
  Header,
  Footer,
  Container,
  Logo,
  LogoutBtn,
  RTE,
  Signup,
  Login,
  PostForm,
  PostCard,
  AuthLayout,
  Select,
  Input,
  Button,
};