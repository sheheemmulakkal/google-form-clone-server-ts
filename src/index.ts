import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/db";
import adminRouter from "./routes/adminRouter";
import userRouter from "./routes/userRouter";
import cors from "cors";

const app = express();
dotenv.config();
dbConnect();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);
app.use("/", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started successfully");
});
