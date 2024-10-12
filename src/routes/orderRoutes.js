import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOrderById,
  handleOrderCancellation,
  handleOrderReturn,
  handleOrderReturnStatus,
  handleOrderStatus,
  updateOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/all", getAllOrder);
orderRouter.get("/:slug", getOrderById);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);
orderRouter.patch("/:id/status", handleOrderStatus);
orderRouter.patch("/:id/cancel", handleOrderCancellation);
orderRouter.patch("/:id/return", handleOrderReturn);
orderRouter.patch("/:id/return/status", handleOrderReturnStatus);

export default orderRouter;
orderRouter;
