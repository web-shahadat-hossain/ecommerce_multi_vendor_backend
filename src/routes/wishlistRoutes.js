import express from "express";
import {
  createWishlist,
  deleteWishlist,
  getAllWishlists,
  getWishlistById,
  updateWishlist,
} from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/", createWishlist);
wishlistRouter.get("/all", getAllWishlists);
wishlistRouter.get("/:id", getWishlistById);
wishlistRouter.put("/:id", updateWishlist);
wishlistRouter.delete("/:id", deleteWishlist);

export default wishlistRouter;
