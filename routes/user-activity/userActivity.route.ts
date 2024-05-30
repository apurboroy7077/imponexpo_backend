import express from "express";
import {
  SUB_ADDRESS_OF_CHECKING_FOLLOWING_SOMETHING_OR_NOT_API,
  SUB_ADDRESS_OF_CHECKING_LIKE_API,
  SUB_ADDRESS_OF_DISLIKING_SOMETHING_API,
  SUB_ADDRESS_OF_FOLLOW_SOMEONE_API,
  SUB_ADDRESS_OF_GETTING_COMMENTS_OF_SOMETHING_API,
  SUB_ADDRESS_OF_GETTING_TOTAL_NUMBERS_OF_FOLLOWERS_OF_A_SUBJECT_API,
  SUB_ADDRESS_OF_GETTING_TOTAL_NUMBER_OF_LIKES_API,
  SUB_ADDRESS_OF_GIVING_COMMENT_API,
  SUB_ADDRESS_OF_LIKE_SOMETHING_API,
  SUB_ADDRESS_OF_MAKING_REPORT_API,
  SUB_ADDRESS_OF_UNFOLLOW_SOMEONE_API,
} from "../../data/EnvironmentVariables";
import {
  checkLikeController,
  checkingIfASubjectIsFollowingSomethingOrNotController,
  dislikeSomethingController,
  followSomeoneController,
  getTotalNumberOfLikesController,
  gettingCommentsOfSomethingController,
  gettingTotalNumberOfFollowersOfASubjectController,
  givingCommentController,
  likeSomethingController,
  makingReportsController,
  searching1Controller,
  unfollowSomeoneController,
} from "../../controllers/user-activity/userActivity.controller";
import { SUB_ADDRESS_OF_SEARCH_API_1 } from "../../data/ApiAddresses";

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
userActivityRouter.post(
  SUB_ADDRESS_OF_GIVING_COMMENT_API,
  givingCommentController
);
userActivityRouter.post(
  SUB_ADDRESS_OF_GETTING_COMMENTS_OF_SOMETHING_API,
  gettingCommentsOfSomethingController
);
userActivityRouter.post(
  SUB_ADDRESS_OF_CHECKING_FOLLOWING_SOMETHING_OR_NOT_API,
  checkingIfASubjectIsFollowingSomethingOrNotController
);
userActivityRouter.post(
  SUB_ADDRESS_OF_UNFOLLOW_SOMEONE_API,
  unfollowSomeoneController
);
userActivityRouter.post(
  SUB_ADDRESS_OF_GETTING_TOTAL_NUMBERS_OF_FOLLOWERS_OF_A_SUBJECT_API,
  gettingTotalNumberOfFollowersOfASubjectController
);
userActivityRouter.post(SUB_ADDRESS_OF_SEARCH_API_1, searching1Controller);
export { userActivityRouter };
