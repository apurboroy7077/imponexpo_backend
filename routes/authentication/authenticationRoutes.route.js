"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const express_1 = __importDefault(require("express"));
const authentiction_controller_1 = require("../../controllers/authentication/authentiction.controller");
const authenticationRouter = express_1.default.Router();
exports.authenticationRouter = authenticationRouter;
authenticationRouter.post("/authentication/sign-up", authentiction_controller_1.signUpController);
authenticationRouter.post("/authentication/sign-in", authentiction_controller_1.signInController);
authenticationRouter.post("/authentication/authenticate-user-with-token", authentiction_controller_1.authenticateUserWithTokenController);
