import express from "express";
import { submitForm } from "../controller/formController";
import { adminLogin, adminSignup } from "../controller/adminController";

const router = express.Router();

router.post("/submit-form", submitForm);
router.post("/login", adminLogin);
router.post("/signup", adminSignup);

export default router;
