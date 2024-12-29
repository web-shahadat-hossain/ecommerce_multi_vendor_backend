import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getAllNameBrands,
  getBrandBySlug,
  updateBrand,
} from "../controllers/BrandController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const brandRouter = express.Router();

brandRouter.post("/", protect, authorize("admin"), createBrand);
brandRouter.get("/all", getAllBrands);
brandRouter.get("/all/name", getAllNameBrands);
brandRouter.get("/:slug", getBrandBySlug);
brandRouter.put("/:id", protect, authorize("admin"), updateBrand);
brandRouter.delete("/:id", protect, authorize("admin"), deleteBrand);

export default brandRouter;
