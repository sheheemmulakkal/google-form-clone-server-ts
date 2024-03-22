import { Request, Response } from "express";
import { Form } from "../models/formModel";
import { ResponseModel } from "../models/responseModel";

const submitForm = async (req: Request, res: Response) => {
  try {
    const { title, description, fields } = req.body;
    const form = new Form({
      title,
      description,
      fields,
      admin: req.currentUser,
    });
    const result = await form.save();
    console.log(result);

    res.status(201).json({ message: "Form created..." });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

const getMyForms = async (req: Request, res: Response) => {
  try {
    const forms = await Form.find({ admin: req.currentUser });
    res.status(200).json(forms);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

const getFormById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).json({ message: "Form not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

const userFormSubmit = async (req: Request, res: Response) => {
  try {
    const { formId, answers } = req.body;
    const response = new ResponseModel({
      formId,
      answers,
    });
    const result = await response.save();
    const form = await Form.findById(formId);
    console.log(form);

    if (form) {
      form.responses?.push(result._id);
      await form.save();
    }
    res.status(201).json({ message: "Form submitted" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export { submitForm, getMyForms, getFormById, userFormSubmit };
