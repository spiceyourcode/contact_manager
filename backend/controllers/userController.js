import asyncHandler from "express-async-handler"
import constants from "../constants.js";
import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//@desc Register a new user
//route POST /users/register 
// access public
const registerUser = asyncHandler(async (req, res) => {
    const { email, username, phone, password } = req.body;
    if (!email || !username || !phone || !password) {
        res.status(constants.BAD_REQUEST);
        throw new Error("all fields (email, username, phone and password) are required");
    }
    // hashing the password 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email, username, phone, password: hashedPassword
    });
    res.status(constants.CREATED).json({ _id: user.id, email: user.email });
});

//@desc login a registered user 
//route POST /users/login
//access public 
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(constants.BAD_REQUEST);
        throw new Error("all fields (email, and password) are required");
    }

    const userAvailable = await User.findOne({ email });
    if (!userAvailable) {
        res.status(constants.NOT_FOUND);
        throw new Error("The user with that email does not exist")
    }
    const isPasswordValid = bcrypt.compareSync(password, userAvailable.password);

    if (userAvailable && isPasswordValid) {
        const accessToken = jwt.sign(
            { 
                user: {
                    username: userAvailable.username,
                    email: userAvailable.email,
                    id: userAvailable.id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
        );
        res.status(constants.OK).json({
            message: "User Logged in Successfully",
            token: accessToken,
            user: {
                username: userAvailable.username,
                email: userAvailable.email,
                id: userAvailable.id
            }
        });
    } else {
        res.status(constants.UNAUTHORIZED).json({
            message: "Invalid Credentials"
        });
    }

});
const currentUser = asyncHandler(async (req, res) => {
    res.status(constants.OK).json({
        message: "The current user",
        user: req.user
    });
});


// @desc change user password 
// route POST /users/change-password
// access private 

const changePassword = asyncHandler(async(req, res) =>{
    const {currentPassword, newPassword} = req.body;

    if(!currentPassword || !newPassword){
        res.status(constants.BAD_REQUEST);
        throw new Error("Both the old and new passwords are required ");
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    
    if(!user){
        res.status(constants.NOT_FOUND);
        throw new Error("User not found");
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if(!isCurrentPasswordValid){
        res.status(constants.UNAUTHORIZED); 
        throw new Error("Current password is incorrect")
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedNewPassword; 
    await user.save();

    res.status(constants.OK).json({
        message: "password changes successfully"
    })
})

export { registerUser, loginUser, currentUser, changePassword };
