// importing the express server 
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import errorHandler from "./middleware/errorHandler.js"
import connectDb from "./config/dbConnection.js";

// initiating the database instance 
connectDb()
dotenv.config();
// starting the express server 
const app = express();
// loading the environment variables
const port = process.env.PORT;

app.use(morgan("combined"));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Contact app listening at http://localhost:${port}`);
  });
}

