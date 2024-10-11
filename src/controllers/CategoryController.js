import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import { Category } from "../models/categoryModel.js";

// @desc create Category
// @router /api/v1/Category
//@ access private route
export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({ status: true, data: newCategory });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get all Categorys
// @router /api/v1/Category
//@ access public
export const getAllCategorys = expressAsyncHandler(async (req, res) => {
  try {
    const categorys = await Category.find();
    res.status(201).json({ status: true, data: categorys });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get a Category
// @router /api/v1/Category/:slug
//@ access public
export const getCategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: category });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a Category
// @router /api/v1/Category/:id
//@ access private
export const updateCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      throw new AppError("Category Not found", 404);
    }

    res.status(201).json({ status: true, data: category });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc delete a Category
// @router /api/v1/Category/:id
//@ access private
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      throw new AppError("Category Not found!", 404);
    }

    res
      .status(201)
      .json({ status: true, message: "Category Deleted Successfully" });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
