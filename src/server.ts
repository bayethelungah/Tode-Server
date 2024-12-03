import express, { raw, Request, Response } from "express";
import cors from "cors";  
import { DependencyNode } from "./models/DependencyNode";
import { parseDependencies } from "./parseDependencies";

// initialize dotenv
import dotenv from 'dotenv';
dotenv.config(); 


const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: process.env.CLIENT_URL, // Replace with your client URL
  methods: ["GET", "POST"],        // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};


// Middleware for parsing JSON
app.use(express.json());

// Enable CORS for specific routes
app.use(cors(corsOptions));

 
app.post("/api/dependencies", (req: Request, res: Response) => {
  const dependencyTree: DependencyNode = parseDependencies(req.body);
  res.send(dependencyTree);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});