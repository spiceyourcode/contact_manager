import asyncHandler from "express-async-handler"
import constants from "../constants.js";
import User from "../models/userModel.js"
import bcrypt from "bcryptjs/dist/bcrypt.js";

//@desc Register a new user
//route POST /users/register 
// access public
const registerUser = asyncHandler(async (req, res) => {
    const {email, username , phone, password} = req.body;
    if (!email || !username || !phone || !password) {
        res.status(constants.BAD_REQUEST);
        throw new Error("all fields (email, username, phone and password) are required");
    }
    // hashing the password 
    const hashedPassword = bcrypt.hashSync(password,10);

    const user = await User.create({
        email, username, phone, password: hashedPassword
    });
    res.status(constants.CREATED).json(user);
});

//@desc login a registered user 
//route POST /users/login
//access public 
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(constants.BAD_REQUEST);
        throw new Error("all fields (email, and password) are required");
    }

    const userAvailable = Contact.findOne({email});
    if(!userAvailable){
        res.status(constants.NOT_FOUND);
        throw new Error("The user with that email does not exist")
    }
    const isPasswordValid = bcrypt.compareSync(password, userAvailable.password);
    if(!isPasswordValid){
        res.status(constants.UNAUTHORIZED);
        throw new Error("password is not valid");
    }
    res.status(constants.OK).json({message: "user logged in successfully"});
    
    
});

export {registerUser, loginUser};