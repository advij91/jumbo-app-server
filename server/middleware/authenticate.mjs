import jwt from "jsonwebtoken";
import StaffUser from "../models/StaffUser.mjs";

export const authenticate = async (req, res, next) => {
  // Try to get token from header or cookie
  let token = req.headers.authorization?.split(" ")[1];
  if (!token && req.cookies && req.cookies.authToken) {
    token = req.cookies.authToken;
  }
  // console.log("Token:", token);
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);  
    req.user = await StaffUser.findOne({staffid: decoded.staffid});
    // console.log("Decoded user:", req.user);
    if (!req.user) return res.status(401).json({ error: "User not found" });
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};