import constants from "../constants.js";
import asyncHandler from "express-async-handler"
import Contact from "../models/contactModel.js";
//@desc Get all contacts 
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(constants.OK).json(contacts);
});

//@desc Get all contacts 
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error(`Contact with id ${req.params.id} is not found`);
    }
    res.status(constants.OK).json(contact);
});

//@desc creating a contact 
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res)=>{
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(constants.BAD_REQUEST);
        throw new Error("The email, name and phone fields are madatory!"); 
    }
    const contact = await Contact.create({
        name,email, phone
    });
    res.status(constants.CREATED).json(contact);
    console.log(`The request body is: ${JSON.stringify(req.body)}`);
});
//@desc updating a contact 
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(constants.NOT_FOUND);
        throw new Error(`Contact with id ${req.params.id} not found `);
    }
    const upatedContact = await Contact.findByIdAndUpdate(
        // The Id to update (findID) 
        req.params.id,
        // updating the field using the new body (update)
        req.body,
        {new :true}
    );

    res.status(constants.OK).json(upatedContact);
});
//@desc deleting a contact 
//@route DELETE /api/contacts/:id
//@access public    
const deleteContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(constants.NOT_FOUND);
        throw new Error(`Contact with id ${req.params.id} not found`);
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(constants.OK).json({message:`Contact with id ${req.params.id} deleted`})
});


export {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};
