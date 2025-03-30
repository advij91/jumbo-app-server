import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import itemsRoutes from "./routes/itemsRoutes.mjs";
import outletsRoutes from "./routes/outletsRoutes.mjs";
import menusRoutes from "./routes/menusRoutes.mjs";
import customersRoutes from "./routes/customersRoutes.mjs";
import usersRoutes from "./routes/usersRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import itemUploadRoutes from "./routes/itemUploadRoutes.mjs"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser())
app.use(cors({
    origin: 'https://jumbo-app-client-4a76.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true, // Allow credentials to be sent with requests
}));
app.use(express.json());

app.use("/auth", usersRoutes)
app.use("/auth", authRoutes)
app.use("/auth", usersRoutes)
app.use("/api", itemsRoutes);
app.use("/api", outletsRoutes);
app.use("/api", menusRoutes);
app.use("/api", customersRoutes);
app.use("/api", usersRoutes);
app.use("/api", itemUploadRoutes);
// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => console.log(`Express server is running on ${PORT}`));