import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createVendor,
  deleteVendor,
  getVendor,
  getVendorBySlug,
  updateVendor,
} from "../controllers/vendorController.js";
const vendorRoute = express.Router();

// created vendor route
vendorRoute.post("/", protect, createVendor);

// get vendor bye slug route
vendorRoute.get("/", getVendor);

// @desc get vendor bye slug
// @router /api/v1/vendor/:slug
//@ access public
vendorRoute.get("/:slug", getVendorBySlug);

// @desc update vendor
// @router /api/v1/vendor/:id
//@ access private
vendorRoute.put("/:id", updateVendor);

// @desc delete vendor
// @router /api/v1/vendor/:id
//@ access private
vendorRoute.delete("/:id", deleteVendor);

export default vendorRoute;
