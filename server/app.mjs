import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
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
import categoriesRoutes from "./routes/categoriesRoutes.mjs";
import chargesRoutes from "./routes/chargesRoutes.mjs";
import couponsRoutes from "./routes/couponsRoutes.mjs";
import addonsRoutes from "./routes/addonsRoutes.mjs";
import ordersRoutes from "./routes/ordersRoutes.mjs";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/auth", usersRoutes);
app.use("/auth", authRoutes);
app.use("/api", itemsRoutes);
app.use("/api", outletsRoutes);
app.use("/api", menusRoutes);
app.use("/api", customersRoutes);
app.use("/api", usersRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", chargesRoutes);
app.use("/api", couponsRoutes);
app.use("/api", addonsRoutes);
app.use("/api", ordersRoutes);

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

export default app;