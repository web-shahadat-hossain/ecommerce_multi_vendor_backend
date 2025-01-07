import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import Product from "../models/productModel.js";

// @desc create product
// @router /api/v1/product
//@ access private route
export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.body);
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
    console.log(products);
    res.status(201).json({ status: true, data: products });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
export const getAllAdminProducts = expressAsyncHandler(async (req, res) => {
  const {
    brand,
    category,
    subCategory,
    subSubCategory,
    search,
    page = 1,
    limit = 10,
  } = req.query;

  try {
    const query = {};
    // Apply filters
    if (brand) query.brand = brand;
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (subSubCategory) query.subSubCategory = subSubCategory;

    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: "i" } }, // Case-insensitive name search
      ];
    }
    console.log(query);
    //  Pagination logic
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(query);

    // Fetch filtered and paginated products
    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    // Send response
    res.status(200).json({
      status: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: products,
    });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get a product
// @router /api/v1/product/:slug
//@ access public
export const getProductBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("vendor", "name email") // Populate vendor details (adjust fields)
      .populate("category", "name") // Populate category details (adjust fields)
      .populate("subCategory", "name") // Populate sub-category details
      .populate("subSubCategory", "name") // Populate sub-sub-category details
      .populate("brand", "name"); // Populate brand details

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: false,
      message: err.message || "Internal Server Error",
    });
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
