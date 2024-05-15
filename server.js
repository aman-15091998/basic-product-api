import dotenv from "dotenv";

dotenv.config();
import express from "express";
import cors from "cors";
import { handleError } from "./middleware/handleError.middleware.js";
import { productRoutes } from "./src/features/product/product.routes.js";
export const app = express();

app.use(cors());
// Setting up express for parsing req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Homepage
app.get("/", (req, res, next) => {
  res.status(200).send("Produt Manamenet Api");
});

// Routes
app.use("/products", productRoutes);

// Error 404 handler
app.use((req, res, next) => {
  res.status(404).send("Resource not found");
});
// Error Handler
app.use((err, req, res, next) => {
  handleError(err, req, res, next);
});
