import { Router } from "express";
const router = Router();
import { 
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
} from "../controllers/contactController.js";

router.get("/", getContacts);

router.get(`/:id`, getContact);

router.post('/', createContact);

router.put(`/:id`, updateContact);

router.delete(`/:id`, deleteContact)

export default router;