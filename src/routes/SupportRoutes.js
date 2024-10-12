import express from "express";
import {
  assignSupport,
  createSupport,
  deleteSupport,
  getAllSupport,
  getSupportById,
  updateASupportStatus,
  updateSupport,
} from "../controllers/supportController.js";

const supportRouter = express.Router();

supportRouter.post("/", createSupport);
supportRouter.get("/all", getAllSupport);
supportRouter.get("/:slug", getSupportById);
supportRouter.put("/:id", updateSupport);
supportRouter.delete("/:id", deleteSupport);
supportRouter.patch("/:id/assign", assignSupport);
supportRouter.patch("/:id/status", updateASupportStatus);

export default supportRouter;
