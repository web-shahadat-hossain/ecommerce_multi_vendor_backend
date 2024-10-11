import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import { Wishlist } from "../models/wishlistModel.js";

// @desc create Wishlist
// @router /api/v1/Wishlist
//@ access private route
export const createWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const newWishlist = await Wishlist.create(req.body);
    res.status(201).json({ status: true, data: newWishlist });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get all Wishlists
// @router /api/v1/Wishlist
//@ access public
export const getAllWishlists = expressAsyncHandler(async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(201).json({ status: true, data: wishlists });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get a Wishlist
// @router /api/v1/Wishlist/:slug
//@ access public
export const getWishlistById = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    res.status(201).json({ status: true, data: wishlist });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a Wishlist
// @router /api/v1/Wishlist/:id
//@ access private
export const updateWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!wishlist) {
      throw new AppError("Wishlist Not found", 404);
    }

    res.status(201).json({ status: true, data: Wishlist });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc delete a Wishlist
// @router /api/v1/Wishlist/:id
//@ access private
export const deleteWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);

    if (!wishlist) {
      throw new AppError("Wishlist Not found!", 404);
    }

    res
      .status(201)
      .json({ status: true, message: "Wishlist Deleted Successfully" });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
