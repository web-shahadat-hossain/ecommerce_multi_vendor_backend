import mongoose from "mongoose";
import slugify from "slugify";

// Define the category schema
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
    logo: String,
    priority: {
      type: String,
      default: 0,
    },
    categoryId: {
      type: String,
      unique: true,
    },
    homeCategoryStatus: {
      type: Boolean,
      default: false,
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

// Middleware to handle slug and unique categoryId generation
categoryModel.pre("save", async function (next) {
  // Generate slug from name
  this.slug = slugify(this.name.toLowerCase());

  // Function to generate a 4-digit random code
  const generateUniqueId = async () => {
    let uniqueCode;
    let exists;
    do {
      uniqueCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit random code
      exists = await mongoose.models.Category.findOne({
        categoryId: uniqueCode,
      });
    } while (exists); // Ensure uniqueness
    return uniqueCode;
  };

  // Assign categoryId if not already set
  if (!this.categoryId) {
    this.categoryId = await generateUniqueId();
  }

  next();
});

// Export the model
export const Category = mongoose.model("Category", categoryModel);
