import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema(
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
    logo: String,
    totalProduct: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
    image_alt_text: String,
    totalOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

brandSchema.pre("save", async function (next) {
  this.slug = slugify(this.name.toLowerCase());
  next();
});

export const Brand = mongoose.model("Brand", brandSchema);
