import mongoose from "mongoose";
import slugify from "slugify";

const subCategoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SubCategory name is required"],
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    priority: {
      type: String,
      default: "0",
    },
    subCategoryId: {
      type: String,
      unique: true,
    },
    subSubCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subSubCategory",
      },
    ],

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

subCategoryModel.pre("save", async function (next) {
  // Generate slug
  this.slug = slugify(this.name.toLowerCase());

  // Function to generate a 4-digit unique ID
  const generateUniqueId = async () => {
    let uniqueCode;
    let exists;
    do {
      uniqueCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random 4-digit code
      exists = await mongoose.models.SubCategory.findOne({
        subCategoryId: uniqueCode,
      });
    } while (exists);
    return uniqueCode;
  };

  // Assign unique subCategoryId
  if (!this.subCategoryId) {
    this.subCategoryId = await generateUniqueId();
  }

  next();
});

export const SubCategory = mongoose.model("SubCategory", subCategoryModel);
