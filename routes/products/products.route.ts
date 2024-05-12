import express from "express";
import {
  SUB_ADDRESS_OF_GETTING_RANDOM_PRODUCTS_API,
  SUB_ADDRESS_OF_UPLOAD_PRODUCTS_API,
} from "../../data/EnvironmentVariables";
import {
  getRandomProductsController,
  productsUploadController,
} from "../../controllers/products/products.controller";

const productsRouter = express.Router();
productsRouter.post(
  SUB_ADDRESS_OF_UPLOAD_PRODUCTS_API,
  productsUploadController
);
productsRouter.post(
  SUB_ADDRESS_OF_GETTING_RANDOM_PRODUCTS_API,
  getRandomProductsController
);
export { productsRouter };
