import express from "express";
import {
  SUB_ADDRESS_OF_CHECKING_LIKE_API,
  SUB_ADDRESS_OF_DISLIKING_SOMETHING_API,
  SUB_ADDRESS_OF_FOLLOW_SOMEONE_API,
  SUB_ADDRESS_OF_GETTING_TOTAL_NUMBER_OF_LIKES_API,
  SUB_ADDRESS_OF_LIKE_SOMETHING_API,
  SUB_ADDRESS_OF_MAKING_REPORT_API,
} from "../../data/EnvironmentVariables";
import {
  checkLikeController,
  dislikeSomethingController,
  followSomeoneController,
  getTotalNumberOfLikesController,
  likeSomethingController,
  makingReportsController,
} from "../../controllers/user-activity/userActivity.controller";

const userActivityRouter = express.Router();
userActivityRouter.post(
  SUB_ADDRESS_OF_LIKE_SOMETHING_API,
  likeSomethingController
);
userActivityRouter.post(SUB_ADDRESS_OF_CHECKING_LIKE_API, checkLikeController);
userActivityRouter.post(
  SUB_ADDRESS_OF_DISLIKING_SOMETHING_API,
  dislikeSomethingController
);
userActivityRouter.post(
  SUB_ADDRESS_OF_GETTING_TOTAL_NUMBER_OF_LIKES_API,
  getTotalNumberOfLikesController
);
userActivityRouter.post(
  SUB_ADDRESS_OF_FOLLOW_SOMEONE_API,
  followSomeoneController
);
userActivityRouter.post(
  SUB_ADDRESS_OF_MAKING_REPORT_API,
  makingReportsController
);
export { userActivityRouter };
