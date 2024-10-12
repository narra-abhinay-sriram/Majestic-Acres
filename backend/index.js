import './db.js'; // Make sure this is at the top before any other imports that use Mongoose

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import mainRouter from "./routes/index.js"; 

const __dirname = path.resolve(); // Get the absolute path of the current directory
const app = express();

// Set up CORS
// Set up CORS
app.use(cors({
    origin: 'https://enchanting-snickerdoodle-64395c.netlify.app', // Frontend URL
    credentials: true,
    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
}));
// Global CORS headers setup
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://enchanting-snickerdoodle-64395c.netlify.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Add allowed HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Add allowed headers

    // Handle preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }
    
    next(); // Proceed to the next middleware or route handler
});


// Middleware
  
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1", mainRouter);

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, '../client/dist'))); // Adjusted path to the static files

// Fallback route for SPA (Single Page Application)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html')); // Adjusted path for fallback
});

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable for PORT
app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});
