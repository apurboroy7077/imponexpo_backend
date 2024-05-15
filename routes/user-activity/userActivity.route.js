"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userActivityRouter = void 0;
const express_1 = __importDefault(require("express"));
const EnvironmentVariables_1 = require("../../data/EnvironmentVariables");
const userActivity_controller_1 = require("../../controllers/user-activity/userActivity.controller");
const userActivityRouter = express_1.default.Router();
exports.userActivityRouter = userActivityRouter;
userActivityRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_LIKE_SOMETHING_API, userActivity_controller_1.likeSomethingController);
userActivityRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_CHECKING_LIKE_API, userActivity_controller_1.checkLikeController);
userActivityRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_DISLIKING_SOMETHING_API, userActivity_controller_1.dislikeSomethingController);
userActivityRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_GETTING_TOTAL_NUMBER_OF_LIKES_API, userActivity_controller_1.getTotalNumberOfLikesController);
userActivityRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_FOLLOW_SOMEONE_API, userActivity_controller_1.followSomeoneController);
userActivityRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_MAKING_REPORT_API, userActivity_controller_1.makingReportsController);
