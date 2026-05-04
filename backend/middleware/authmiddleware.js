import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // ✅ ADD THIS

export const authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // ✅ FIX HERE (id not userid)
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error); // 👈 IMPORTANT
    res.status(401).json({ message: "Invalid token" });
  }
};

