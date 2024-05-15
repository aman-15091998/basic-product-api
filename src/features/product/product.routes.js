import { Router } from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./product.controller.js";

export const productRoutes = Router();

// GET Routes
productRoutes.get("/", getAllProducts);
// POST Routes
productRoutes.post("/create", createNewProduct);
// DELETE Routes
productRoutes.delete("/:id", deleteProduct);
// PUT Routes
productRoutes.put("/:id/update_quantity", updateProduct);
