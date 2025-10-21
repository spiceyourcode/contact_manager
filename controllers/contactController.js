//@desc Get all contacts 
//@route GET /api/contacts
//@access public

const getContacts = async (req, res) => {
    try{
        await res.status(200).json({message: "get all contacts"});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}
//@desc Get all contacts 
//@route GET /api/contacts
//@access public
const getContact = async (req, res) =>{
    try{
        await res.status(200).json({message: `contact with id ${req.params.id}`});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}
//@desc creating a contact 
//@route POST /api/contacts
//@access public
const createContact = async (req, res)=>{
    try{
        await res.status(201).json({message: `Contact with id ${req.params.id} created`})
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}
//@desc updating a contact 
//@route PUT /api/contacts/:id
//@access public
const updateContact = async (req, res) => {
    try{
        await res.status(200).json({message: `contact with id ${req.params.id} updated`})
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}
//@desc deleting a contact 
//@route DELETE /api/contacts/:id
//@access public    
const deleteContact = async (req, res)=>{
    try{
        await res.status(200).json({message:`Contact with id ${req.params.id} deleted`})
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}


export default {getContacts, getContact,createContact, updateContact, deleteContact};
