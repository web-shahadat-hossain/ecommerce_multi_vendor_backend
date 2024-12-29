import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategorys,
  getSubCategoryBySlug,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const subCategoryRouter = express.Router();

subCategoryRouter.post("/", protect, authorize("admin"), createSubCategory);
subCategoryRouter.get("/all", getAllSubCategorys);
subCategoryRouter.get("/:slug", getSubCategoryBySlug);
subCategoryRouter.put("/:id", protect, authorize("admin"), updateSubCategory);
subCategoryRouter.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteSubCategory
);

export default subCategoryRouter;
