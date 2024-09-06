//server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests from both the frontend and localhost
      const allowedOrigins = [
        "http://localhost:3000", // React development server
        "https://resumecreator-frontend.onrender.com" // Deployed frontend URL
      ];
      
      // Check if the origin is in the allowed origins
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Reject the request
      }
    },
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };

// Apply CORS middleware with options
app.use(cors(corsOptions));
app.use(express.json());



// Route middleware
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => res.send('API running'));

// Error handling middleware - should be the last middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
