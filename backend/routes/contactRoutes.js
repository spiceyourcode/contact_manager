import validateToken from "../middleware/validateTokenHandler.js";
import { Router } from "express";
const router = Router();
import { 
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
} from "../controllers/contactController.js";

router.use(validateToken);
// CRUD operation routes 
router.get("/", getContacts);
router.post("/", createContact);
router.get("/:id", getContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;