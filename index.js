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
// Error handler middlewares
app.use(errorHandler);
app.use(notFoundErrorHandler);
// starting the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT} `);
});
