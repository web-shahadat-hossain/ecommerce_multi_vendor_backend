import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler.js";
import { User } from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") // Corrected "startWith" to "startsWith"
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
      next();
    } catch (err) {
      next(new AppError("Not Authorized", 401)); // Pass error to next middleware
    }
  }

  if (!token) {
    next(new AppError("No token attached to the header", 401)); // Pass error to next middleware
  }
};

// Role-based Authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new AppError("You don't have permissions", 403)); // Pass error to next middleware
    }
    next();
  };
};
