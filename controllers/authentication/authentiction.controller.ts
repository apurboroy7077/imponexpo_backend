import express from "express";
import { userDataModelMongoDbMongoose } from "../../models/mongodb/schemas.model";
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
    console.log(userDataForClientSide);

    const authenticationToken = jwt.sign({ userEmail }, JWT_SECRET_KEY);
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
    const { userEmail } = processedData;
    const userDataSavedOnDatabase = await userDataModelMongoDbMongoose.find({
      userEmail: userEmail,
    });

    let userDataForClientSide: userDataForClientSideType;
    userDataForClientSide = userDataSavedOnDatabase[0].toObject();
    delete userDataForClientSide.password;
    delete userDataForClientSide._id;
    console.log(userDataForClientSide);
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
export {
  signUpController,
  signInController,
  authenticateUserWithTokenController,
};
