import expressAsyncHandler from "express-async-handler";
import { Support } from "../models/supportModel.js";

// @desc create  support
// @router /api/v1/support
//@ access public route
export const createSupport = expressAsyncHandler(async (req, res) => {
  try {
    const newSupport = await Support.create(req.body);
    res.status(200).json({ status: true, data: newSupport });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get all support
// @router /api/v1/support
//@ access private
export const getAllSupport = expressAsyncHandler(async (req, res) => {
  try {
    const supports = await Support.find().populate(
      "user product assignedTo assignedBy"
    );
    res.status(200).json({ status: true, data: supports });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc get a support
// @router /api/v1/support/:id
//@ access public
export const getSupportById = expressAsyncHandler(async (req, res) => {
  try {
    const support = await Support.findById(req.params.id).populate(
      "user product assignedTo assignedBy"
    );

    if (!support) {
      return res
        .status(404)
        .json({ status: false, message: "Support Query not found!" });
    }

    res.status(200).json({ status: true, data: support });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc update a Support
// @router /api/v1/support/:id
//@ access private
export const updateSupport = expressAsyncHandler(async (req, res) => {
  try {
    const support = await Support.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!support) {
      throw new AppError("Support Not found", 404);
    }

    res.status(200).json({ status: true, data: support });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc delete a Support
// @router /api/v1/support/:id
//@ access private
export const deleteSupport = expressAsyncHandler(async (req, res) => {
  try {
    const support = await Support.findByIdAndDelete(req.params.id);

    if (!support) {
      throw new AppError("Support Not found!", 404);
    }

    res
      .status(200)
      .json({ status: true, message: "Support Deleted Successfully" });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc assign support
// @router /api/v1/support/:id
//@ access private
export const assignSupport = expressAsyncHandler(async (req, res) => {
  try {
    const { assignedTo, assignedBy } = req.body;
    const support = await Support.findByIdAndUpdate(
      req.params.id,
      { assignedTo, assignedBy },
      {
        new: true,
      }
    ).populate("user product assignedTo assignedBy");
    if (!support) {
      throw new AppError("Support Not found", 404);
    }

    res.status(200).json({ status: true, data: support });
  } catch (err) {
    throw new AppError(err, 400);
  }
});

// @desc assign support
// @router /api/v1/support/:id
//@ access private
export const updateASupportStatus = expressAsyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const support = await Support.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
      }
    ).populate("user product assignedTo assignedBy");
    if (!support) {
      throw new AppError("Support Not found", 404);
    }

    res.status(200).json({ status: true, data: support });
  } catch (err) {
    throw new AppError(err, 400);
  }
});
