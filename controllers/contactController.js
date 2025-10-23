import constants from "../constants";
import asyncHandler from "express-async-handler"

//@desc Get all contacts 
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    res.status(constants.OK).json({ message: "get all contacts" });
});

//@desc Get all contacts 
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) =>{
    res.status(constants.OK).json({ message: `contact with id ${req.params.id}` });
});

//@desc creating a contact 
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res)=>{
    const {name, email} = req.body;
    if(!name || !email){
        res.status(constants.BAD_REQUEST);
        throw new Error("The email and name fields are madatory!"); 
    }
    res.status(constants.OK).json({message: `Contact created`});
    console.log(`The request body is: ${JSON.stringify(req.body)}`);
});
//@desc updating a contact 
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(constants.OK).json({message: `contact with id ${req.params.id} updated`})
});
//@desc deleting a contact 
//@route DELETE /api/contacts/:id
//@access public    
const deleteContact = asyncHandler(async (req, res)=>{
    res.status(200).json({message:`Contact with id ${req.params.id} deleted`})
});


export {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};
