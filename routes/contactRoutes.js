import { Router } from "express";
const router = Router();
import { 
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
} from "../controllers/contactController.js";

// CRUD operation routes 
router.get("/", getContacts);
router.post("/", createContact);
router.get("/:id", getContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;