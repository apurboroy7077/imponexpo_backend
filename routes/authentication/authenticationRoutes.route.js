"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const express_1 = __importDefault(require("express"));
const authentiction_controller_1 = require("../../controllers/authentication/authentiction.controller");
const EnvironmentVariables_1 = require("../../data/EnvironmentVariables");
const authenticationRouter = express_1.default.Router();
exports.authenticationRouter = authenticationRouter;
authenticationRouter.post("/authentication/sign-up", authentiction_controller_1.signUpController);
authenticationRouter.post("/authentication/sign-in", authentiction_controller_1.signInController);
authenticationRouter.post("/authentication/authenticate-user-with-token", authentiction_controller_1.authenticateUserWithTokenController);
authenticationRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_GETTING_SELLER_DETAILS_FOR_CLIENT_SIDE_API, authentiction_controller_1.getSellerDetailsOfProductsForClientSideController);
