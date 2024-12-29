import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import { Brand } from "../models/brandModel.js";

// @desc create Brand
// @router /api/v1/Brand
//@ access private route
export const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).json({ status: true, data: newBrand });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get all Brands
// @router /api/v1/Brand
//@ access public
export const getAllBrands = expressAsyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 }); // -1 for descending order
    res.status(200).json({ status: true, data: brands });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
export const getAllNameBrands = expressAsyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find()
      .select("name _id")
      .sort({ createdAt: -1 }); // -1 for descending order
    res.status(200).json({ status: true, data: brands });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get a Brand
// @router /api/v1/Brand/:slug
//@ access public
export const getBrandBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: brand });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a Brand
// @router /api/v1/Brand/:id
//@ access private
export const updateBrand = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!brand) {
      throw new AppError("Brand Not found", 404);
    }

    res.status(201).json({ status: true, data: brand });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc delete a Brand
// @router /api/v1/Brand/:id
//@ access private
export const deleteBrand = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);

    if (!brand) {
      throw new AppError("Brand Not found!", 404);
    }

    res
      .status(201)
      .json({ status: true, message: "Brand Deleted Successfully" });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
