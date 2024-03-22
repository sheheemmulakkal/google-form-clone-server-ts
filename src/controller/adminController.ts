import { Request, Response } from "express";
import { Admin } from "../models/adminModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSignup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email: email.trim() });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin Already exist" });
    }
    const hashedPassword = await bcrypt.hash(password.trim(), 12);
    const admin = new Admin({
      email: email.trim(),
      password: hashedPassword,
    });
    const response = await admin.save();
    const token = jwt.sign(
      { role: "admin", id: response._id },
      process.env.JWT_KEY!
    );
    res.status(200).json({ message: "Admin signin successfully", token });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const isExist = await Admin.findOne({ email: email.trim() });
    if (!isExist) return res.status(400).json({ message: "Email not exist" });
    const validPassword = await bcrypt.compare(
      password.trim(),
      isExist.password
    );
    if (!validPassword)
      return res.status(400).json({ message: "Inavlid password" });

    const token = jwt.sign(
      { role: "admin", id: isExist._id },
      process.env.JWT_KEY!
    );
    res.status(200).json({ message: "Admin logged in", token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export { adminSignup, adminLogin };
