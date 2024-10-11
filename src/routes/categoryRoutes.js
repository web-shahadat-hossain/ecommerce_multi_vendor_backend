import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategorys,
  getCategoryBySlug,
  updateCategory,
} from "../controllers/CategoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/all", getAllCategorys);
categoryRouter.get("/:slug", getCategoryBySlug);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
