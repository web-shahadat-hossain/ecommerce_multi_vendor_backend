import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllAdminProducts,
  getAllProducts,
  getProductBySlug,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
// admin route
productRouter.get("/admin", getAllAdminProducts);
productRouter.get("/all", getAllProducts);
productRouter.get("/:slug", getProductBySlug);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
