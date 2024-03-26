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

// 2. Allow Custom Origins
app.use(
  cors({
    origin: "https://managingbooks.netlify.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

// sending a basic response to the webpage
app.get(
  "https://book-management-website.onrender.com/",
  (request, response) => {
    console.log(request);
    return response.status(200).send("Welcome to my MERN stack project.");
  }
);

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
