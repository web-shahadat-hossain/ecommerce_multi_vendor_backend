import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import { Review } from "../models/reviewModel.js";

// @desc create Review
// @router /api/v1/review
//@ access private route
export const createReview = expressAsyncHandler(async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json({ status: true, data: newReview });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get all Reviews
// @router /api/v1/review
//@ access public
export const getAllReviews = expressAsyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(201).json({ status: true, data: reviews });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get a Review
// @router /api/v1/Review/:id
//@ access public
export const getReviewById = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    res.status(201).json({ status: true, data: review });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a Review
// @router /api/v1/Review/:id
//@ access private
export const updateReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!review) {
      throw new AppError("Review Not found", 404);
    }

    res.status(201).json({ status: true, data: review });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc delete a Review
// @router /api/v1/Review/:id
//@ access private
export const deleteReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      throw new AppError("Review Not found!", 404);
    }

    res
      .status(201)
      .json({ status: true, message: "Review Deleted Successfully" });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc delete a Review
// @router /api/v1/Review/approve-request
//@ access private
export const approveAReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: req.body.isApproved,
      },
      {
        new: true,
      }
    );

    if (!review) {
      throw new AppError("Review Not found!", 404);
    }

    res
      .status(201)
      .json({ status: true, message: "Review Updated Successfully" });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
