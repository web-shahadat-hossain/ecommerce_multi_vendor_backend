import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandBySlug,
  updateBrand,
} from "../controllers/BrandController.js";

const brandRouter = express.Router();

brandRouter.post("/", createBrand);
brandRouter.get("/all", getAllBrands);
brandRouter.get("/:slug", getBrandBySlug);
brandRouter.put("/:id", updateBrand);
brandRouter.delete("/:id", deleteBrand);

export default brandRouter;
