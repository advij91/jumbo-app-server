import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
dotenv.config();

import itemsRoutes from "./routes/itemsRoutes.mjs";
import outletsRoutes from "./routes/outletsRoutes.mjs";
import menusRoutes from "./routes/menusRoutes.mjs";
import customersRoutes from "./routes/customersRoutes.mjs";
import usersRoutes from "./routes/usersRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser())
app.use(cors());
app.use(express.json());

app.use("/auth", usersRoutes)
app.use("/auth", authRoutes)
app.use("/auth", usersRoutes)
app.use("/api", itemsRoutes);
app.use("/api", outletsRoutes);
app.use("/api", menusRoutes);
app.use("/api", customersRoutes);

app.listen(PORT, () => console.log(`Express server is running on ${PORT}`));