import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategorys,
  getCategoryBySlug,
  updateCategory,
  getAllCategoryData,
} from "../controllers/CategoryController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/", protect, authorize("admin"), createCategory);
categoryRouter.get("/all", getAllCategorys);
categoryRouter.get("/all/list", getAllCategoryData);
categoryRouter.get("/:slug", getCategoryBySlug);
categoryRouter.put("/:id", protect, authorize("admin"), updateCategory);
categoryRouter.delete("/:id", protect, authorize("admin"), deleteCategory);

export default categoryRouter;
