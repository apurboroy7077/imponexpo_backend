"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = __importDefault(require("express"));
const EnvironmentVariables_1 = require("../../data/EnvironmentVariables");
const products_controller_1 = require("../../controllers/products/products.controller");
const ApiAddresses_1 = require("../../data/ApiAddresses");
const productsRouter = express_1.default.Router();
exports.productsRouter = productsRouter;
productsRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_UPLOAD_PRODUCTS_API, products_controller_1.productsUploadController);
productsRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_GETTING_RANDOM_PRODUCTS_API, products_controller_1.getRandomProductsController);
productsRouter.post(ApiAddresses_1.SUB_ADDRESS_OF_GETTING_RANDOM_PRODUCTS_2_API, products_controller_1.getRandomProducts2Controller);
productsRouter.post(ApiAddresses_1.SUB_ADDRESS_OF_GETTING_PRODUCT_DETAILS_WITH_AR7ID_API, products_controller_1.getProductDetailsWithAr7idController);
