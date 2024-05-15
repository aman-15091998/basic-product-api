import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  _id: Number,
  name: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, default: 0 },
});

export const productModel = mongoose.model("Product", productSchema);
