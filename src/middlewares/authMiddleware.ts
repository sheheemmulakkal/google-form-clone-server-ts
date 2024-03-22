import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express" {
  interface Request {
    currentUser?: string;
  }
}

const isAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload;
      if (decoded.role === "admin") {
        req.currentUser = decoded.id;
        next();
      } else {
        res.status(401).json({ message: "Not authorized" });
      }
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export { isAdminAuth };
