import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    _id: false,
  }
);

const supportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: [messageSchema],
  status: {
    type: String,
    enum: ["open", "in_progress", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "hight"],
    default: "low",
  },
  category: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

supportSchema.pre("save", function (next) {
  this.updateAt = new Date();
  next();
});

export const Support = mongoose.model("Support", supportSchema);
