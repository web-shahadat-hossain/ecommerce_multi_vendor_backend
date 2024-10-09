import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import { Vendor } from "../models/vendorModel.js";

// created vendor  private route
export const createVendor = expressAsyncHandler(async (req, res) => {
  try {
    const newVendor = await Vendor.create(req.body);
    res.status(201).json({ status: true, data: newVendor });
  } catch (err) {
    throw new AppError("Something went wrong!", 400);
  }
});

// get all  vendor public route
export const getVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendors = await Vendor.find({}).populate("user");

    res.status(201).json({ status: true, data: vendors });
  } catch (err) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc get vendor bye slug
// @router /api/v1/vendor
//@ access public

export const getVendorBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const vendors = await Vendor.findOne({ slug: req.params.slug }).populate(
      "user",
      "-password"
    );

    res.status(201).json({ status: true, data: vendors });
  } catch (err) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc update vendor bye slug
// @router /api/v1/vendor
//@ access private
export const updateVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }
    res.status(201).json({ status: true, data: vendors });
  } catch (err) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc delete vendor
// @router /api/v1/vendor
//@ access private
export const deleteVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      throw new AppError("Vendor not found!", 404);
    }

    res.status(201).json({ status: true, data: vendor });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
