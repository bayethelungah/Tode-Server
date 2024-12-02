import express, { raw, Request, Response } from "express";
import cors from "cors";  
import { DependencyNode } from "./models/DependencyNode";


const app = express();
const PORT = 8080;

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your client URL
  methods: ["GET", "POST"],        // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};


// Middleware for parsing JSON
app.use(express.json());

// Enable CORS for specific routes
app.use(cors(corsOptions));

 
app.post("/api/dependencies", (req: Request, res: Response) => {
  
  const dependencyTree: DependencyNode = {
    name: "root",
    dependencies: [req.body]
  };

  console.log("Request Body:", req.body);
  res.send(dependencyTree);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});