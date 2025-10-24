import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    email : {
        type: String, 
        required : [true, "The email field is mandatory"],
        unique : [true, "Use another Email"]
    },
    username : {
        type : String,
        unique :[true, 'Try another username']
    },
    phone: {
        type: Number,
        unique :[true, 'Try another phone number']
    },
    password :{
        type: String,
        required :[true , "The Password is required "]
    }

}, {timestamps :true }
);

export default mongoose.Schema("User",userSchema);