import express from "express";
import {
  authenticateUserWithTokenController,
  getSellerDetailsOfProductsForClientSideController,
  signInController,
  signUpController,
} from "../../controllers/authentication/authentiction.controller";
import { SUB_ADDRESS_OF_GETTING_SELLER_DETAILS_FOR_CLIENT_SIDE_API } from "../../data/EnvironmentVariables";
const authenticationRouter = express.Router();
authenticationRouter.post("/authentication/sign-up", signUpController);
authenticationRouter.post("/authentication/sign-in", signInController);
authenticationRouter.post(
  "/authentication/authenticate-user-with-token",
  authenticateUserWithTokenController
);
authenticationRouter.post(
  SUB_ADDRESS_OF_GETTING_SELLER_DETAILS_FOR_CLIENT_SIDE_API,
  getSellerDetailsOfProductsForClientSideController
);
export { authenticationRouter };
