import { indexModel } from "./index.schema.js";
import { productModel } from "./product.schema.js";

export const getProdcutRepo = async (factor) => {
  return await productModel.findOne(factor);
};

export const addProduct = async (newProduct) => {
  const _id = await getId();
  newProduct._id = _id;
  const product = new productModel({ ...newProduct, _id });
  await product.save();
  return await product;
};

// getting custom id for product and incrementing the id for next product
export const getId = async () => {
  const doc = await indexModel.findById(1);
  const index = doc.id;
  doc.id = doc.id + 1;
  await doc.save();
  return index;
};

export const getAllProductsRepo = async () => {
  return await productModel.find({});
};

export const deleteProductRepo = async (factor) => {
  await productModel.deleteOne(factor);
};

export const updateProductRepo = async (id, update) => {
  return await productModel.findOneAndUpdate({ _id: id }, update, {
    new: true,
  });
};
