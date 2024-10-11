import express from "express";
import {
  approveAReview,
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/all", getAllReviews);
reviewRouter.get("/:id", getReviewById);
reviewRouter.put("/:id", updateReview);
reviewRouter.put("/approve-request", approveAReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
