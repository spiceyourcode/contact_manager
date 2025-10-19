// importing the express server 
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
const app = express();
// loading the environment variables
const port = process.env.PORT;

app.use(morgan("dev"));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
app.get("/api/contacts", (req, res) => {
    res.json({message: "welcome to the contacts API"});
});
