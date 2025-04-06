import express from "express";
import https from "https";
import fs from "fs";
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
// import itemUploadRoutes from "./routes/itemUploadRoutes.mjs"

const app = express();
const PORT = process.env.PORT || 5000;

// const sslOptions = {
//     key: fs.readFileSync(process.env.SSL_KEY_PATH),
//     cert: fs.readFileSync(process.env.SSL_CERT_PATH),
// }

app.use(cookieParser())
// app.use(cors({
//     origin: 'https://jumbo-app-client-4a76.vercel.app',
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//     credentials: true, // Allow credentials to be sent with requests
// }));
app.use(cors())
app.use(express.json());

app.use("/auth", usersRoutes)
app.use("/auth", authRoutes)
app.use("/auth", usersRoutes)
app.use("/api", itemsRoutes);
app.use("/api", outletsRoutes);
app.use("/api", menusRoutes);
app.use("/api", customersRoutes);
app.use("/api", usersRoutes);
// app.use("/api", itemUploadRoutes);
// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => console.log(`Express server is running on ${PORT}`));
app.listen(PORT, () => console.log(`Express server is running on ${PORT}`))