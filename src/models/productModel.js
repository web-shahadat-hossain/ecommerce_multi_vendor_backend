import mongoose from "mongoose";
import slugify from "slugify"; // Use ES6 import syntax

// Reusable sub-schemas for modularity
const SeoSchema = new mongoose.Schema({
  metaTitle: String,
  metaDescription: String,
  metaImage: String, // URL of meta image
  indexOptions: {
    index: { type: Boolean, default: true },
    noFollow: { type: Boolean, default: false },
    noIndex: { type: Boolean, default: false },
    noArchive: { type: Boolean, default: false },
  },
});

const PricingSchema = new mongoose.Schema({
  unitPrice: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  discountType: {
    type: String,
    enum: ["Flat", "Percentage"],
  },
  taxAmount: { type: Number, default: 0 },
  taxCalculation: {
    type: String,
    enum: ["Include with product", "Exclude with product"],
  },
  shippingCost: { type: Number, default: 0 },
  shippingCostMultiplyWithQuantity: { type: Boolean, default: false },
});

const InventorySchema = new mongoose.Schema({
  minimumOrderQty: { type: Number, default: 1 },
  currentStockQty: { type: Number, required: true },
});

const ProductVariationSchema = new mongoose.Schema({
  colors: [String], // Array of colors
  attributes: {
    size: [String], // Array of sizes
  },
});

const ImagesSchema = new mongoose.Schema({
  thumbnail: String, // URL of thumbnail image
  colorWiseImages: [String], // Array of image URLs
  additionalImages: [String], // Array of additional image URLs
});

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: String,
    descriptionTranslations: {
      en: String,
      bn: String, // Bangla
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    slug: { type: String, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    subSubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSubCategory",
    },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    productType: {
      type: String,
      enum: ["Physical", "Digital"],
      default: "Physical",
    },
    productSKU: { type: String, unique: true },
    unit: { type: String, default: "pcs" },
    searchTags: [String], // Array of strings for search tags
    pricing: PricingSchema,
    inventory: InventorySchema,
    productVariations: ProductVariationSchema,
    totalStock: { type: Number, default: 0 },
    images: ImagesSchema,
    productVideo: {
      youtubeLink: String, // URL of YouTube video
    },
    seo: SeoSchema,
  },
  { timestamps: true }
);

// Middleware to auto-generate slug
ProductSchema.pre("save", async function (next) {
  if (!this.slug) {
    this.slug = slugify(this.productName.toLowerCase());
  }
  next();
});

// Middleware to calculate total stock dynamically
ProductSchema.pre("save", function (next) {
  if (this.productVariations && this.productVariations.colors?.length > 0) {
    this.totalStock = this.inventory.currentStockQty; // Simplified dynamic calculation
  }
  next();
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
