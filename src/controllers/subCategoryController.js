import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import { SubCategory } from "../models/subCategoryModel.js";

// @desc create SubCategory
// @router /api/v1/SubCategory
//@ access private route
export const createSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newSubCategory = await SubCategory.create(req.body);
    res.status(201).json({ status: true, data: newSubCategory });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get all SubCategory
// @router /api/v1/SubCategory
//@ access public
export const getAllSubCategorys = expressAsyncHandler(async (req, res) => {
  try {
    const subCategory = await SubCategory.find();
    res.status(201).json({ status: true, data: subCategory });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get a SubCategory
// @router /api/v1/SubCategory/:slug
//@ access public
export const getSubCategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const subCategory = await SubCategory.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: subCategory });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a SubCategory
// @router /api/v1/SubCategory/:id
//@ access private
export const updateSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!subCategory) {
      throw new AppError("SubCategory Not found", 404);
    }

    res.status(201).json({ status: true, data: subCategory });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc delete a SubCategory
// @router /api/v1/SubCategory/:id
//@ access private
export const deleteSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!subCategory) {
      throw new AppError("SubCategory Not found!", 404);
    }

    res
      .status(201)
      .json({ status: true, message: "SubCategory Deleted Successfully" });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
