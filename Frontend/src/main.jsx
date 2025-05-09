import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPost";

// Define the application routes using React Router
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // Root component
    children: [
      {
        path: "/", // Home page
        element: <Home />,
      },
      {
        path: "/login", // Login page
        element: (
          <AuthLayout authentication={false}> {/* Protected route for unauthenticated users */}
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup", // Signup page
        element: (
          <AuthLayout authentication={false}> {/* Protected route for unauthenticated users */}
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts", // All posts page
        element: (
          <AuthLayout authentication> {/* Protected route for authenticated users */}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post", // Add post page
        element: (
          <AuthLayout authentication> {/* Protected route for authenticated users */}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug", // Edit post page with dynamic slug
        element: (
          <AuthLayout authentication> {/* Protected route for authenticated users */}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug", // Single post page with dynamic slug
        element: <Post />,
      },
    ],
  },
])

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide the Redux store to the application */}
    <Provider store={store}>
      {/* Provide the router to the application */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)