import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import { SubCategory } from "../models/subCategoryModel.js";
import { Category } from "../models/categoryModel.js";

// @desc create SubCategory
// @router /api/v1/SubCategory
//@ access private route

export const createSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { name, priority, parent_id } = req.body;
  try {
    // Validate required fields
    if (!name) {
      return next(new AppError("SubCategory name is required", 400));
    }
    if (!parent_id) {
      return next(new AppError("Main Category ID is required", 400));
    }

    // Check if the main category exists
    const mainCategory = await Category.findById(parent_id);
    if (!mainCategory) {
      return next(new AppError("Main Category not found", 404));
    }

    // Create the new SubCategory
    const newSubCategory = await SubCategory.create({
      name,
      priority,
      category: parent_id,
    });

    // Add the new SubCategory's ID to the main category
    mainCategory.subCategory.push(newSubCategory._id);
    await mainCategory.save();

    // Return response
    res.status(201).json({
      status: true,
      message: "SubCategory created and linked to Main Category successfully",
      data: newSubCategory,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new AppError("Duplicate field value entered", err, 400)); // Handle duplicate key errors
    }
    next(err); // Pass other errors to the global error handler
  }
});

// @desc get all SubCategory
// @router /api/v1/SubCategory
//@ access public

export const getAllSubCategorys = expressAsyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    // Construct a filter for search
    const filter = search
      ? { name: { $regex: search, $options: "i" } } // Case-insensitive search by name
      : {};

    // Fetch the subcategories with the search filter and pagination
    const subCategories = await SubCategory.find(filter)
      .populate({
        path: "category",
        select: "name", // Only include the 'name' property of the category
      })
      .skip((page - 1) * limit) // Skip based on the page and limit
      .limit(Number(limit)) // Limit the number of items per page
      .sort({ createdAt: -1 }); // Sort by created date (descending)

    // Count total number of subcategories for pagination
    const total = await SubCategory.countDocuments(filter);

    res.status(200).json({
      status: true,
      data: subCategories,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get a SubCategory
// @router /api/v1/SubCategory/:slug
//@ access public
export const getSubCategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.slug);
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
    // Find and delete the subcategory
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!subCategory) {
      throw new AppError("SubCategory Not found!", 404);
    }

    // Find the main category that references this subcategory
    const mainCategory = await Category.findOne({ subCategory: req.params.id });

    if (mainCategory) {
      // Remove the subcategory ID from the main category's subCategory array
      mainCategory.subCategory.pull(req.params.id);

      // Save the updated main category
      await mainCategory.save();
    }

    // Respond with success message
    res.status(200).json({
      status: true,
      message: "SubCategory Deleted Successfully",
    });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
