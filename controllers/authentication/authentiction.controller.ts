import express from "express";
import {
  sellersDataModelMongoDbMongoose,
  userDataModelMongoDbMongoose,
} from "../../models/mongodb/schemas.model";
import {
  checkPassword,
  hashMyPassword,
} from "../../custom-functions/password-hashing/hashingPassword";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../data/EnvironmentVariables";
import {
  userDataForClientSideType,
  userDataSavedOnDatabaseType,
} from "../../data/types";
import ar7id from "../../custom-functions/ar7id/ar7id";
import { bannedSubjectDataModelMongoDbMongoose } from "../../models/mongodb/schemas2.model";
const signUpController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = await request.body;
    const {
      firstName,
      lastName,
      userEmail,
      phoneCountryCode,
      phoneNumber,
      password,
      accountType,
      companyName,
      countryRegion,
      reasonForSignup,
      imponexpoAccountURL,
    } = receivedData;
    // CHECK IF USER ALREADY EXISTS-------------------------------------------------------------------------------------------------------------------------
    const alreadyExistingUserWithSameEmail =
      await userDataModelMongoDbMongoose.find({ userEmail });
    console.log(alreadyExistingUserWithSameEmail);
    if (alreadyExistingUserWithSameEmail.length > 0) {
      throw new Error("User with Same Email Already Exists.");
    }
    // HASHING PASSWORD-----------------------------------------------------------------------------------------------------------------------------------------------
    const hashedPassword = await hashMyPassword(password);
    // PROCESSING DATA FOR DATABASE----------------------------------------------------------------------------------------------------------------
    const userFullNameFinal = `${firstName} ${lastName}`;
    const theAr7id = ar7id();
    const dataForSavingToDatabase = {
      userFullName: userFullNameFinal,
      userEmail: userEmail,
      countryCodeOfPhoneNumber: phoneCountryCode,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      accountType: accountType,
      companyName: companyName,
      countryRegion: countryRegion,
      reasonForSignup: reasonForSignup,
      imponexpoAccountURL: imponexpoAccountURL,
      ar7id: theAr7id,
    };
    // SAVING TO DATABASE--------------------------------------------------------------------------------------------------------------------------------------
    await userDataModelMongoDbMongoose.create(dataForSavingToDatabase);
    // SENDING A RESPONSE IF SIGNUP IS SUCCESSFUL-------------------------------------------------------------------------------------------------------------
    response.status(201).send({ message: "Signing Up is Successful." });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------

    response.status(500).send(error.message);
  }
};
const signInController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = await request.body;
    const { userEmail, password } = receivedData;
    // CHECK IF USER WITH SAME EMAIL EXISTS--------------------------------------------------------------------------------------
    const matchedUsers = await userDataModelMongoDbMongoose.find({
      userEmail: userEmail,
    });

    if (matchedUsers.length < 1) {
      throw new Error("No User is Registered with this Email!");
    }

    // CHECK IF PASSWORD IS CORRECT------------------------------------------------------------------------------------------------
    const hashedPassword = matchedUsers[0].password;
    const isPasswordCorrect = await checkPassword(password, hashedPassword);
    if (isPasswordCorrect === false) {
      throw new Error("Password is Incorrect");
    }
    // CREATE JSONWEBTOKEN---------------------------------------------------------------------------------------------------------

    let userDataForClientSide: userDataForClientSideType =
      matchedUsers[0].toObject();
    delete userDataForClientSide.password;
    delete userDataForClientSide._id;

    const { ar7id } = matchedUsers[0];

    const authenticationToken = jwt.sign({ ar7id }, JWT_SECRET_KEY);
    response.status(200).send({
      message: "Signing In Successful.",
      authenticationToken: authenticationToken,
      userData: userDataForClientSide,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------

    response.status(500).send(error.message);
  }
};
const authenticateUserWithTokenController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = await request.body;
    const authenticationToken = receivedData.authenticationToken;
    const processedData = jwt.verify(
      authenticationToken,
      JWT_SECRET_KEY
    ) as JwtPayload;

    const ar7idOfToken = processedData.ar7id;
    const userDataSavedOnDatabase = await userDataModelMongoDbMongoose.find({
      ar7id: ar7idOfToken,
    });

    let userDataForClientSide: userDataForClientSideType;
    userDataForClientSide = userDataSavedOnDatabase[0].toObject();
    delete userDataForClientSide.password;
    delete userDataForClientSide._id;

    response.status(200).send({
      message: "Authentication Successful",
      userData: userDataForClientSide,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const getSellerDetailsOfProductsForClientSideController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = await request.body;
    const { authenticationToken, ar7idOfTheSeller } = receivedData;
    await jwt.verify(authenticationToken, JWT_SECRET_KEY);

    const sellerDetailsSavedOnDatabase =
      await userDataModelMongoDbMongoose.find({
        ar7id: ar7idOfTheSeller,
      });
    const sellerDetails =
      sellerDetailsSavedOnDatabase[0].toObject() as userDataForClientSideType;
    delete sellerDetails.password;
    delete sellerDetails._id;

    response.status(200).send({
      message: "Received Seller Details Request Successfully",
      sellerDetails: sellerDetails,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const gettingUserDetailsForClientsController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { ar7idOfTheUser } = receivedData;
    const userDataSavedOnDatabase = await userDataModelMongoDbMongoose.findOne({
      ar7id: ar7idOfTheUser,
    });

    const processedDataForClient =
      userDataSavedOnDatabase?.toObject() as userDataForClientSideType;

    delete processedDataForClient.password;

    response.status(200).send({
      message: "Received User Details Request Successfully",
      userData: processedDataForClient,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const checkBanStatusController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { ar7idOfTheUser } = receivedData;
    const bannedStatusData =
      await bannedSubjectDataModelMongoDbMongoose.findOne({
        ar7idOfTheBannedSubject: ar7idOfTheUser,
      });

    response.status(200).send({
      message: "Received User Details Request Successfully",
      bannedStatusData: bannedStatusData,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const checkPermissionToSellStatusController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { ar7idOfTheUser } = receivedData;
    const data = await sellersDataModelMongoDbMongoose.findOne({
      ar7idOfSeller: ar7idOfTheUser,
    });

    response.status(200).send({
      message: "Checked Permission to Sell Successfully",
      data: data,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
export {
  signUpController,
  signInController,
  authenticateUserWithTokenController,
  getSellerDetailsOfProductsForClientSideController,
  gettingUserDetailsForClientsController,
  checkBanStatusController,
  checkPermissionToSellStatusController,
};
//
