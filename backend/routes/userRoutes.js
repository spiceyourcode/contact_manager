import { Router } from "express";
import { registerUser, loginUser, currentUser, changePassword} from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser)
router.put("/change-password", validateToken, changePassword);

export default router;