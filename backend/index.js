import './db.js'; // Make sure this is at the top before any other imports that use Mongoose

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import mainRouter from "./routes/index.js"; 

const __dirname = path.resolve(); // Get the absolute path of the current directory
const app = express();

// Set up CORS
app.use(cors({
    origin: 'http://localhost:5173', // Update this to your frontend URL when deployed
    credentials: true,
}));

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
