import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware to handle CORS policy
// 1. Allow All Origins with Default of CORS(*)
// app.use(cors());

// Allow CORS requests from specific origin
// app.use(
//   cors({
//     origin: ["https://managingbooks.netlify.app",'http://localhost:5173'], // Replace with your allowed origin
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods (optional)
//     credentials: true, // Allow sending cookies (optional)
//     allowedHeaders: ["Content-Type"], // Allowed request headers (optional)
//   })
// );

const allowedOrigins = ["https://managingbooks.netlify.app",'http://localhost:5173'];

// Middleware to set CORS headers
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// sending a basic response to the webpage
app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to my MERN stack project.");
});

// Middleware to use books route from our routes file
app.use("/books", booksRoute);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App connect to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
