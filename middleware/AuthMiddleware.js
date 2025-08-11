import jwt from "jsonwebtoken";
import User from "../model/User.js";

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains user ID from token
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default AuthMiddleware;
