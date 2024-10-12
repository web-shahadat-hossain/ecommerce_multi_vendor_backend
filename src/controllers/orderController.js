import expressAsyncHandler from "express-async-handler";
import { Order } from "../models/orderModel.js";

// @desc create order
// @router /api/v1/order
//@ access public route
export const createOrder = expressAsyncHandler(async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(200).json({ status: true, data: newOrder });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get all order
// @router /api/v1/order
//@ access private
export const getAllOrder = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("user items.product");
    res.status(200).json({ status: true, data: orders });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get a order
// @router /api/v1/order/:id
//@ access public
export const getOrderById = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user items.product"
    );
    res.status(200).json({ status: true, data: order });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a Order
// @router /api/v1/order/:id
//@ access private
export const updateOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!order) {
      throw new AppError("Order Not found", 404);
    }

    res.status(200).json({ status: true, data: order });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc delete a Order
// @router /api/v1/order/:id
//@ access private
export const deleteOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      throw new AppError("Order Not found!", 404);
    }

    res
      .status(200)
      .json({ status: true, message: "Order Deleted Successfully" });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a  Order status
// @router /api/v1/order/:id
//@ access private
export const handleOrderStatus = expressAsyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      throw new AppError("Order Not found!", 404);
    }

    res.status(200).json({ status: true, data: order });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a  Order cancellation
// @router /api/v1/order/:id
//@ access private
export const handleOrderCancellation = expressAsyncHandler(async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: "cancelled",
        cancellation: { reason: reason, createAt: new Date() },
      },
      { new: true }
    );

    if (!order) {
      throw new AppError("Order Not found!", 404);
    }

    res.status(200).json({ status: true, data: order });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a  Order return
// @router /api/v1/order/:id
//@ access private
export const handleOrderReturn = expressAsyncHandler(async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        return: { reason, status: "pending", createAt: new Date() },
      },
      { new: true }
    );

    if (!order) {
      throw new AppError("Order Not found!", 404);
    }

    res.status(200).json({ status: true, data: order });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a  Order return Status
// @router /api/v1/order/:id
//@ access private
export const handleOrderReturnStatus = expressAsyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, "return.status": "pending" },

      {
        "return.status": status,
      },
      { new: true }
    );

    if (!order) {
      throw new AppError("Order Not found!", 404);
    }

    res.status(200).json({ status: true, data: order });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
