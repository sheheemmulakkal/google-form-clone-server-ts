import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/db";

const app = express();
dotenv.config();
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log("Server started successfully");
});
