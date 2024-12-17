import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import Product from "../models/productModel.js";

// @desc create product
// @router /api/v1/product
//@ access private route
export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ status: true, data: newProduct });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get all products
// @router /api/v1/product
//@ access public
export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    console.log("products");
    res.status(201).json({ status: true, data: products });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get a product
// @router /api/v1/product/:slug
//@ access public
export const getProductBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: product });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a product
// @router /api/v1/product/:id
//@ access private
export const updateProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      throw new AppError("Product Not found", 404);
    }

    res.status(201).json({ status: true, data: product });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc delete a product
// @router /api/v1/product/:id
//@ access private
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new AppError("Product Not found!", 404);
    }

    res
      .status(201)
      .json({ status: true, message: "Product Deleted Successfully" });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
