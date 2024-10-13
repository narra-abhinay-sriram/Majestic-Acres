import './db.js'; // Make sure this is at the top before any other imports that use Mongoose

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import mainRouter from "./routes/index.js"; 

const app = express();

// Set up CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1", mainRouter);



// Start the server
app.listen(3000, () => {
    console.log(`App running at http://localhost:3000`);
});
