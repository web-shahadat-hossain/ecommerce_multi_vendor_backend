import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategorys,
  getSubCategoryBySlug,
  updateSubCategory,
} from "../controllers/subCategoryController.js";

const subCategoryRouter = express.Router();

subCategoryRouter.post("/", createSubCategory);
subCategoryRouter.get("/all", getAllSubCategorys);
subCategoryRouter.get("/:slug", getSubCategoryBySlug);
subCategoryRouter.put("/:id", updateSubCategory);
subCategoryRouter.delete("/:id", deleteSubCategory);

export default subCategoryRouter;
