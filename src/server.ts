import express, { raw, Request, Response } from "express";
import cors from "cors";  
import { handleUploadDependencies, handleSearchDependencies } from "./handleDependencies";
import { TodeRequestMessage, TodeResponseMessage } from "./models/ServerIO";

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

 
app.post("/api/dependencies/upload/:searchDepth", async (req: Request, res: Response) => {
  const searchDepth = parseInt(req.params.searchDepth);
  console.log("typeof req.body: ", typeof req.body);
  const response: TodeResponseMessage = await handleUploadDependencies(req.body, searchDepth);
  res.send(response);
});

app.post("/api/dependencies/search/:searchDepth", async (req: Request, res: Response) => {
  const searchDepth = parseInt(req.params.searchDepth);
  const response: TodeResponseMessage = await handleSearchDependencies(req.body as TodeRequestMessage, searchDepth);
  res.send(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});