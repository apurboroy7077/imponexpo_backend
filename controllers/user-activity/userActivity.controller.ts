import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../data/EnvironmentVariables";
import { processedDataOfAuthenticationToken } from "../../data/types";
import {
  followersDataModelMongoDbMongoose,
  likeDatatypeForSavingInDatabase,
  likesDataModelMongoDbMongoose,
} from "../../models/mongodb/schemas.model";
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
    const likeGiverEmail = processedTokenData.userEmail;
    const unixTimeStamp = Math.floor(Date.now() / 1000);
    const likeDataForSavingInDatabase: likeDatatypeForSavingInDatabase = {
      emailOfLikeGiver: likeGiverEmail,
      ar7idOfSubjectThatReceivedLike: ar7idOfSubjectThatReceivedLike,
      unixTimeStamp: unixTimeStamp,
    };
    await likesDataModelMongoDbMongoose.create(likeDataForSavingInDatabase);

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
    const likeGiverEmail = processedTokenData.userEmail;
    await likesDataModelMongoDbMongoose.deleteOne({
      emailOfLikeGiver: likeGiverEmail,
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
    const userEmail = processedData.userEmail;
    const likeDataSavedOnDatabase = await likesDataModelMongoDbMongoose.find({
      emailOfLikeGiver: userEmail,
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
export {
  likeSomethingController,
  checkLikeController,
  dislikeSomethingController,
  getTotalNumberOfLikesController,
  followSomeoneController,
};

// {
//   const newFilename = `${Date.now()}-${productImage.originalFilename}`;
//   const uploadDir = path.join(__dirname, "uploads");
//   if (!existsSync(uploadDir)) {
//     mkdirSync(uploadDir);
//   }

//   const newPath = path.join(uploadDir, newFilename);

//   renameSync(productImage.filepath, newPath);
// }
