import express from "express";
import {
  authenticateUserWithTokenController,
  signInController,
  signUpController,
} from "../../controllers/authentication/authentiction.controller";
const authenticationRouter = express.Router();
authenticationRouter.post("/authentication/sign-up", signUpController);
authenticationRouter.post("/authentication/sign-in", signInController);
authenticationRouter.post(
  "/authentication/authenticate-user-with-token",
  authenticateUserWithTokenController
);
export { authenticationRouter };
