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

export { submitForm };
