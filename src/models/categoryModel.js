import mongoose from "mongoose";
import slugify from "slugify";

const categoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    slug: {
      type: String,
      unique: true,
    },
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

categoryModel.pre("save", async function (next) {
  this.slug = slugify(this.name.toLowerCase());
  next();
});

export const Category = mongoose.model("Category", categoryModel);
