import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../data/EnvironmentVariables";
import { processedDataOfAuthenticationToken } from "../../data/types";
import {
  commentsDataModelMongoDbMongoose,
  followersDataModelMongoDbMongoose,
  likeDatatypeForSavingInDatabase,
  likesDataModelMongoDbMongoose,
  productsDataModelMongoDbMongoose,
  reportsDataModelMongoDbMongoose,
} from "../../models/mongodb/schemas.model";
import {
  authorizeAndGiveReceivedData,
  getUserAr7idFromToken,
} from "../../custom-functions/authentication/authentication";
const likeSomethingController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { authenticationToken, ar7idOfSubjectThatReceivedLike } =
      receivedData;
    const processedTokenData = jwt.verify(
      authenticationToken,
      JWT_SECRET_KEY
    ) as processedDataOfAuthenticationToken;
    const ar7idOfLikeGiver = processedTokenData.ar7id;
    const timeStamp = Date.now();

    await likesDataModelMongoDbMongoose.create({
      ar7idOfLikeGiver: ar7idOfLikeGiver,
      ar7idOfSubjectThatReceivedLike: ar7idOfSubjectThatReceivedLike,
      timeStamp: timeStamp,
    });

    response.status(200).send({
      message: "Product is Liked Successfully",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const dislikeSomethingController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { authenticationToken, ar7idOfSubjectThatReceivedLike } =
      receivedData;
    const processedTokenData = jwt.verify(
      authenticationToken,
      JWT_SECRET_KEY
    ) as processedDataOfAuthenticationToken;
    const likeGiverAr7id = processedTokenData.ar7id;
    await likesDataModelMongoDbMongoose.deleteOne({
      ar7idOfLikeGiver: likeGiverAr7id,
      ar7idOfSubjectThatReceivedLike: ar7idOfSubjectThatReceivedLike,
    });

    response.status(200).send({
      message: "Disliked Successfully",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const checkLikeController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { ar7idOfSubjectThatReceivedLike, authenticationToken } =
      receivedData;
    const processedData = jwt.verify(
      authenticationToken,
      JWT_SECRET_KEY
    ) as processedDataOfAuthenticationToken;
    const ar7idOfTheUser = processedData.ar7id;
    const likeDataSavedOnDatabase = await likesDataModelMongoDbMongoose.find({
      ar7idOfLikeGiver: ar7idOfTheUser,
      ar7idOfSubjectThatReceivedLike: ar7idOfSubjectThatReceivedLike,
    });

    let likeStatus: "LIKED" | "NOT_LIKED" = "NOT_LIKED";
    if (likeDataSavedOnDatabase.length < 1) {
      likeStatus = "NOT_LIKED";
    } else if (likeDataSavedOnDatabase.length > 0) {
      likeStatus = "LIKED";
    }
    response.status(200).send({
      message: "Check Like Request Accepted Successfully",
      likeStatus: likeStatus,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const getTotalNumberOfLikesController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { ar7idOfSubjectThatReceivedLike } = receivedData;
    const totalNumberOfLikes =
      await likesDataModelMongoDbMongoose.countDocuments({
        ar7idOfSubjectThatReceivedLike: ar7idOfSubjectThatReceivedLike,
      });

    response.status(200).send({
      message: "Total Number of Likes Counted Successfully.",
      totalNumberOfLikes: totalNumberOfLikes,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const followSomeoneController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = authorizeAndGiveReceivedData(request);
    const { ar7idOfTheSubjectWhichWillBeFollowed, ar7idOfUserWhoRequested } =
      receivedData;
    const timeStamp = Date.now();
    console.log(receivedData);
    await followersDataModelMongoDbMongoose.create({
      ar7idOfTheSubjectWhichIsFollowing: ar7idOfUserWhoRequested,
      ar7idOfTheSubjectWhichIsGettingFollowed:
        ar7idOfTheSubjectWhichWillBeFollowed,
      timeStamp: timeStamp,
    });
    response.status(200).send({
      message: "Followed Successfully",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const unfollowSomeoneController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = authorizeAndGiveReceivedData(request);

    const { ar7idOfTheSubjectWhichWillBeFollowed, ar7idOfUserWhoRequested } =
      receivedData;
    await followersDataModelMongoDbMongoose.deleteOne({
      ar7idOfTheSubjectWhichIsFollowing: ar7idOfUserWhoRequested,
      ar7idOfTheSubjectWhichIsGettingFollowed:
        ar7idOfTheSubjectWhichWillBeFollowed,
    });

    response.status(200).send({
      message: "Unfollowed Successfully",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const checkingIfASubjectIsFollowingSomethingOrNotController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = authorizeAndGiveReceivedData(request);
    const { ar7idOfSubjectWhichIsGettingFollowed, ar7idOfUserWhoRequested } =
      receivedData;

    const dataInDatabase = await followersDataModelMongoDbMongoose.find({
      ar7idOfTheSubjectWhichIsGettingFollowed:
        ar7idOfSubjectWhichIsGettingFollowed,
      ar7idOfTheSubjectWhichIsFollowing: ar7idOfUserWhoRequested,
    });
    let followingStatus = "";
    if (dataInDatabase.length > 0) {
      followingStatus = "FOLLOWING";
    } else {
      followingStatus = "NOT_FOLLOWING";
    }

    response.status(200).send({
      message: "Follow check complete.",
      followingStatus: followingStatus,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const gettingTotalNumberOfFollowersOfASubjectController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { ar7idOfSubjectWhichIsGettingFollowed } = receivedData;
    const totalFollowers =
      await followersDataModelMongoDbMongoose.countDocuments({
        ar7idOfTheSubjectWhichIsGettingFollowed:
          ar7idOfSubjectWhichIsGettingFollowed,
      });
    console.log(totalFollowers);
    response.status(200).send({
      message: "Fetched Total Numbers Of Followers Successfully",
      totalFollowersOfTheUser: totalFollowers,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const makingReportsController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { authenticationToken } = receivedData;
    const processedDataOfToken = jwt.verify(
      authenticationToken,
      JWT_SECRET_KEY
    ) as processedDataOfAuthenticationToken;
    const ar7idOfTheUser = processedDataOfToken.ar7id;
    const { reportMessage } = receivedData;
    const timeStamp = Date.now();
    await reportsDataModelMongoDbMongoose.create({
      ar7idOfThePersonWhoReported: ar7idOfTheUser,
      reportMessage: reportMessage,
      timeStamp: timeStamp,
    });

    response.status(200).send({
      message: "Report Made Successfully.",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const givingCommentController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = authorizeAndGiveReceivedData(request);
    const {
      ar7idOfTheCommentPopupSubject,
      givenComment,
      ar7idOfUserWhoRequested,
    } = receivedData;

    const commentSubjectAr7id = ar7idOfTheCommentPopupSubject;
    const commentGiverAr7id = ar7idOfUserWhoRequested;
    const timeStamp_ = Date.now();
    await commentsDataModelMongoDbMongoose.create({
      ar7idOfCommentGiver: commentGiverAr7id,
      ar7idOfSubjectWhoReceivedComment: commentSubjectAr7id,
      comment: givenComment,
      timeStamp: timeStamp_,
    });
    response.status(200).send({
      message: "Comment Made Successfully",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const gettingCommentsOfSomethingController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { ar7idOfTheSubject, paginationSerial } = receivedData;
    const commentsSerial = Number(paginationSerial);
    let commentsFrom = (commentsSerial - 1) * 10;
    const commentsTo = paginationSerial * 10;
    const commentsLimit = 10;
    const numberOfComments =
      await commentsDataModelMongoDbMongoose.countDocuments({
        ar7idOfSubjectWhoReceivedComment: ar7idOfTheSubject,
      });
    let startingPoint = 0;
    if (numberOfComments > 10) {
      startingPoint = numberOfComments - paginationSerial * 10;
    }
    const commentsData = await commentsDataModelMongoDbMongoose
      .find({ ar7idOfSubjectWhoReceivedComment: ar7idOfTheSubject })
      .skip(startingPoint)
      .limit(commentsLimit);

    response.status(200).send({
      message: "Comment Made Successfully",
      commentsData: commentsData,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const searching1Controller = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { typenWords } = receivedData;
    const matchedProducts = await productsDataModelMongoDbMongoose
      .find({
        $or: [{ productName: { $regex: new RegExp(typenWords, "i") } }],
      })
      .limit(10);

    response.status(200).send({
      message: "Searched Successfully.",
      searchResult: matchedProducts,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
export {
  likeSomethingController,
  checkLikeController,
  dislikeSomethingController,
  getTotalNumberOfLikesController,
  followSomeoneController,
  unfollowSomeoneController,
  makingReportsController,
  givingCommentController,
  gettingCommentsOfSomethingController,
  checkingIfASubjectIsFollowingSomethingOrNotController,
  gettingTotalNumberOfFollowersOfASubjectController,
  searching1Controller,
};
//
