import { Request, Response } from "express";
import { Form } from "../models/formModel";

const submitForm = async (req: Request, res: Response) => {
  try {
    const { title, description, fields } = req.body;
    // console.log(title);

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

export { submitForm, getMyForms };
