import { Request, Response } from "express";

const adminSignup = (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export { adminSignup };
