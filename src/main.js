import cors from "cors";
import "dotenv/config";
import express from "express";
import { StatusCodes } from "http-status-codes";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { errorMiddleware } from "./global/middleware/error.middleware.js";
import routes from "./router/routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// App Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Serves images
app.use(express.static(__dirname + "/assets"));

app.get("/", (req, res) => {
  const successResponse = { success: true, message: "API is running on /api" };
  res.status(StatusCodes.OK).json(successResponse);
});

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  err.type = "CONTROLLER";
  return next(err);
});

// Error handler middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.clear();
  console.info(`server up on port ${PORT}`);
});
