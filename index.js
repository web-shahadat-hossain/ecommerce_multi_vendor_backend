import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/utils/utils.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import {
  errorHandler,
  notFoundErrorHandler,
} from "./src/middleware/errorHandler.js";
import userRouter from "./src/routes/userRoutes.js";
import vendorRoute from "./src/routes/vendorRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import categoryRouter from "./src/routes/CategoryRoutes.js";
import brandRouter from "./src/routes/brandRoute.js";
import subCategoryRouter from "./src/routes/subCategoryRoutes.js";
import wishlistRouter from "./src/routes/wishlistRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";
import uploadRouter from "./src/routes/uploadRoutes.js";
// local  environment from .env file
dotenv.config();

// connection to mongodb
dbConnect();

// initialize express app
const app = express();

// middleware setup
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Api routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/vendor", vendorRoute);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", subCategoryRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/upload", uploadRouter);
// Error handler middlewares
app.use(errorHandler);
app.use(notFoundErrorHandler);
// starting the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT} `);
});
