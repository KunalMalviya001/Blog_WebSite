import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import RouteLogin from './routes/Route.Login.js';
import RouteCreateLogin from './routes/Router.CreateLogin.js';
import RouteBlog from './routes/Route.Blog.js';
import RouteCreateBlog from './routes/Route.CreateBlog.js';
import RouteLogout from './routes/Router.Logout.js';
import RouteEditBlog from './routes/Router.EditBlog.js'; // Import Edit Blog route
import RouteDeleteBlog from './routes/Router.DeleteBlog.js' // Import Delete Blog route
import {upload} from './Multer/Upload.js'; // Import multer for file uploads
import RouteSingelBlog from './routes/Route.SingleBlog.js'
import RouteUserBlog from './routes/Route.UserBlog.js' // Import User Blog route

dotenv.config();
const app = express();

// Middleware
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
// app.use(cookieParser())



app.use('/api/login', RouteLogin); // Login route
app.use('/api/createUser', RouteCreateLogin); // Create User route
app.use('/api/logout', RouteLogout); // Logout route
app.use('/api/createBlog', upload.single("featuredImage"), RouteCreateBlog); // Create Blog route
app.use('/api/editBlog', upload.single("featuredImage"), RouteEditBlog); // Edit Blog route
app.use('/api/deleteBlog', RouteDeleteBlog); // Delete Blog route
app.use('/api/blog', RouteBlog); // Blog route
app.use('/api/singelBlog', RouteSingelBlog)
app.use('/api/userBlog', RouteUserBlog); // User Blog route



// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));
