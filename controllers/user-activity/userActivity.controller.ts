import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../data/EnvironmentVariables";
import { processedDataOfAuthenticationToken } from "../../data/types";
import {
  followersDataModelMongoDbMongoose,
  likeDatatypeForSavingInDatabase,
  likesDataModelMongoDbMongoose,
  reportsDataModelMongoDbMongoose,
} from "../../models/mongodb/schemas.model";
import { getUserAr7idFromToken } from "../../custom-functions/authentication/authentication";
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
    const unixTimeStamp = Math.floor(Date.now() / 1000);

    await likesDataModelMongoDbMongoose.create({
      ar7idOfLikeGiver: ar7idOfLikeGiver,
      ar7idOfSubjectThatReceivedLike: ar7idOfSubjectThatReceivedLike,
      unixTimeStamp: unixTimeStamp,
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
    const receivedData = request.body;
    // const { authenticationToken, emailOfThePersonWhoIsFollowing } =
    //   receivedData;
    // const processedTokenData = jwt.verify(
    //   authenticationToken,
    //   JWT_SECRET_KEY
    // ) as processedDataOfAuthenticationToken;
    // const likeGiverEmail = processedTokenData.userEmail;
    // const unixTimeStamp = Math.floor(Date.now() / 1000);
    console.log("Follow Someone Request Received");
    response.status(200).send({
      message: "Product is Liked Successfully",
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
    const unixTimeStamp = Math.floor(Date.now() / 1000);
    await reportsDataModelMongoDbMongoose.create({
      ar7idOfThePersonWhoReported: ar7idOfTheUser,
      reportMessage: reportMessage,
      unixTimeStamp: unixTimeStamp,
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
export {
  likeSomethingController,
  checkLikeController,
  dislikeSomethingController,
  getTotalNumberOfLikesController,
  followSomeoneController,
  makingReportsController,
};
