import asyncHandler from "express-async-handler"
import constants from "../constants.js";
import User from "../models/userModel.js"
import bcrypt from "bcryptjs/dist/bcrypt.js";
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
    const hashedPassword = bcrypt.hashSync(password, 10);

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
    if (!isPasswordValid && userAvailable.email !== email) {
        res.status(constants.UNAUTHORIZED);
        throw new Error("password or username is not valid");
    } else {
        const accessToken = jwt.sign(
            {
                user: {
                    username: userAvailable.username,
                    email: userAvailable.email,
                    id: userAvailable.id,
                },
            },
            process.env['ACCESS_TOKEN_SECRET'],
            {
                expiresIn: "1m"
            }
        );
        //condition to check the token 
        if(!accessToken){
            res.status(
                constants.NOT_FOUND
            ).json({
                message: "no access token "
            })
        }
        res.status(constants.OK).json({
            "message" : "User logged in sucessfully",
            "Accesstoken" : `${accessToken}`
        });
    }


});
const currentUser = asyncHandler(async (req, res) => {
    res.status(constants.OK).json({message : "The current user"});
});

export { registerUser, loginUser, currentUser };