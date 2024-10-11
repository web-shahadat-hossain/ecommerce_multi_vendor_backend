import mongoose from "mongoose";
import slugify from "slugify";

const subCategoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

subCategoryModel.pre("save", async function (next) {
  this.slug = slugify(this.name.toLowerCase());
  next();
});
export const SubCategory = mongoose.model("SubCategory", subCategoryModel);
