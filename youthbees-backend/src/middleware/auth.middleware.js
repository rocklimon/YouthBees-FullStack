import { auth } from "../config/firebase.js";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied! Token missing. Please log in again.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format.",
      });
    }

    // 🔑 Verify Firebase ID Token
    const decoded = await auth.verifyIdToken(token);

    // Fetch user from MongoDB database
    const dbUser = await User.findOne({
      email: decoded.email,
    });

    if (!dbUser) {
      return res.status(404).json({
        message: "User not found in database.",
      });
    }

    req.user = dbUser;
    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({
      message: "Invalid or expired token. Please log in again.",
      error: err.message,
    });
  }
};