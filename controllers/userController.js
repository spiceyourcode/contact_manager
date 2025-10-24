//import expressAsyncHandler from "express-async-handler"
import constants from "../constants.js";


const registerUser = async (req, res) => {
    const {email, username , phone, password} = req.body;
    if (!email || !username || !phone || !password) {
        res.status(constants.BAD_REQUEST);
        throw new Error("all fields (email, username, phone and password) are required");
    }
    res.status(constants.CREATED).json(`contact created`);
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(constants.BAD_REQUEST);
        throw new Error("all fields (email, and password) are required");
    }
}

export {registerUser, loginUser};