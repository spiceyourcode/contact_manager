import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    const connect =await  mongoose.connect(process.env["CONNECTION_STRING"]);
    console.log("Database Connected", connect.connection.host, connect.connection.name); // return back the connection host and the connection name 
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
