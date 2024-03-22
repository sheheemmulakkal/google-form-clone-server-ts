import express from "express";
import { getFormById, userFormSubmit } from "../controller/formController";

const router = express.Router();

router.get("/form/:id", getFormById);
router.post("/form-submit", userFormSubmit);

export default router;
