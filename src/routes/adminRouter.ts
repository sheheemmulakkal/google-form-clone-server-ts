import express from "express";
import { getMyForms, submitForm } from "../controller/formController";
import { adminLogin, adminSignup } from "../controller/adminController";
import { isAdminAuth } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/get-my-forms", isAdminAuth, getMyForms);
router.post("/submit-form", isAdminAuth, submitForm);
router.post("/login", adminLogin);
router.post("/signup", adminSignup);

export default router;
