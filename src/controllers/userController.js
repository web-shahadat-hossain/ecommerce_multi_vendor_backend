import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/utils.js";
import { AppError } from "../middleware/errorHandler.js";

// Register User public route
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

// Login User public route
// export const loginUser = expressAsyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });

//     if (
//       userExists &&
//       (await userExists.comparePassword(password, userExists.password))
//     ) {
//       // If user exists and password matches
//       res.json({
//         _id: userExists._id,
//         name: userExists.name,
//         email: userExists.email,
//         role: userExists.role,
//         token: generateToken(userExists._id),
//       });
//     } else {
//       // Throw an error if login details are incorrect
//       return next(new AppError("Invalid email or password", 401));
//     }
//   } catch (error) {
//     next(error); // Pass error to the error handler
//   }
// });

// Login User public route
export const loginUser = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (!userExists) {
      // If the user doesn't exist, return an error for invalid email
      return next(new AppError("Invalid email or username", 401));
    }

    const isPasswordValid = await userExists.comparePassword(
      password,
      userExists.password
    );
    if (!isPasswordValid) {
      // If the password doesn't match, return an error for invalid password
      return next(new AppError("Invalid password", 401));
    }

    // If both email and password are valid, return the user data and token
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      role: userExists.role,
      token: generateToken(userExists._id),
    });
  } catch (error) {
    next(error); // Pass error to the error handler
  }
});

// profile private route
export const profile = expressAsyncHandler(async (req, res, next) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive,
      });
    } else {
      throw new AppError("User not found");
    }
  } catch (error) {
    next(error); // Pass error to the error handler
  }
});

// profile update private route
export const UpdateProfile = expressAsyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      user.address = req.body.address || user.address;
      user.phone = req.body.phone || user.phone;

      await user.save();
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive,
        address: user.address,
      });
    } else {
      throw new AppError("User not found");
    }
  } catch (error) {
    next(error); // Pass error to the error handler
  }
});

// get all user profile admin private route
export const getAllProfile = expressAsyncHandler(async (req, res, next) => {
  try {
    const user = await User.find({});

    if (user) {
      res.json(user);
    } else {
      throw new AppError("User not found");
    }
  } catch (error) {
    next(error); // Pass error to the error handler
  }
});
// delete user profile  private route
export const deleteUserProfile = expressAsyncHandler(async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
  } catch (error) {
    next(error); // Pass error to the error handler
  }
});
