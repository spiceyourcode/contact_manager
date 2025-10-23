// importing the express server 
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import errorHandler from "./middleware/errorHandler.js"
import connectDb from "./config/dbConnection.js";

// initiating the database instance 
connectDb()
dotenv.config();
// starting the express server 
const app = express();
// loading the environment variables
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Contact app listening at http://localhost:${port}`);
})

