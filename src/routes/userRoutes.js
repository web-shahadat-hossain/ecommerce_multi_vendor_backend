import express from "express";
import {
  deleteUserProfile,
  getAllProfile,
  loginUser,
  profile,
  registerUser,
  UpdateProfile,
} from "../controllers/userController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", protect, profile);
userRouter.put("/profile", protect, UpdateProfile);
userRouter.get("/profiles", protect, authorize("admin"), getAllProfile);
userRouter.delete("/:id", protect, deleteUserProfile);

export default userRouter;
