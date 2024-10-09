import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/utils.js";
import { AppError } from "../middleware/errorHandler.js";

// Register User
export const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase(); // Ensure email is case-insensitive
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      // If user already exists, throw an AppError
      return next(new AppError("User already exists", 400));
    }

    const user = await User.create({
      name,
      email: normalizedEmail, // Store the normalized email
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      return next(new AppError("Invalid user data", 400));
    }
  } catch (error) {
    next(error); // Pass error to the error handler
  }
});

// Login User
export const loginUser = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase(); // Ensure email is case-insensitive
    const userExists = await User.findOne({ email: normalizedEmail });

    if (
      userExists &&
      (await userExists.comparePassword(password, userExists.password))
    ) {
      // If user exists and password matches
      res.json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        role: userExists.role,
        token: generateToken(userExists._id),
      });
    } else {
      // Throw an error if login details are incorrect
      return next(new AppError("Invalid email or password", 401));
    }
  } catch (error) {
    next(error); // Pass error to the error handler
  }
});
