import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadController.js";

const uploadRouter = express.Router();
const upload = multer({ dest: "uploads/" });

uploadRouter.post("/", upload.single("file"), uploadFile);

export default uploadRouter;
