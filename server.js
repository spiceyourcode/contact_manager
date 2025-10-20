// importing the express server 
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();
// loading the environment variables
const port = process.env.PORT;

app.use(morgan("dev"));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

// using the middlewares

app.use("/api/contacts", contactRoutes);