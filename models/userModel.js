import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    email : {
        type: String, 
        required : [true, "The email field is mandatory"],
        unique : true
    },
    username : {
        type : String,
        unique : true
    },
    phone: {
        type: String,  // Changed to String for better phone number handling
        unique : true
    },
    password :{
        type: String,
        required : [true , "The Password is required "]
    }

}, { timestamps: true }
);

export default mongoose.model("User", userSchema); 