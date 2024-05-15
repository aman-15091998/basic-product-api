import { ErrorHandler } from "../../../utils/errorHandler.js";
import {
  addProduct,
  deleteProductRepo,
  getAllProductsRepo,
  getProdcutRepo,
  updateProductRepo,
} from "./product.repository.js";

export const createNewProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    if (!name || !quantity)
      return next(
        new ErrorHandler(
          400,
          "Please provide 'name' and 'quantity' as parameters"
        )
      );
    const product = await getProdcutRepo({ name });
    if (product)
      return next(
        new ErrorHandler(400, `Product ${name} is already added in the list`)
      );
    const newProduct = await addProduct({ name, quantity });
    res.status(201).send({ data: newProduct });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await getAllProductsRepo();
    return res.status(200).send({ data: { products: allProducts } });
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new ErrorHandler(400, "id parameter is required"));
    const product = await getProdcutRepo({ _id: id });
    if (!product) return next(new ErrorHandler(404, "Product not found"));

    await deleteProductRepo({ _id: id });
    res.status(201).send({ data: { message: "product deleted" } });
  } catch (error) {
    return next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { number } = req.query;
    const { id } = req.params;
    if (!id || !number)
      return next(
        new ErrorHandler(400, "id as params and nummber as query is required")
      );
    const product = await getProdcutRepo({ _id: id });
    if (!product) return next(new ErrorHandler(404, "Product not found"));
    const update = { $inc: { quantity: number } };
    const updatedProduct = await updateProductRepo(id, update);
    res.status(201).send({
      data: { product: updatedProduct },
      message: "updated successfully",
    });
  } catch (error) {
    return next(error);
  }
};
