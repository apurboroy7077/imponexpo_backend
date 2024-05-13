import express from "express";
import {
  IMPONEXPO_SUPERUSER_KEY,
  JWT_SECRET_KEY,
} from "../../data/EnvironmentVariables";
import {
  adminDataModelMongoDbMongoose,
  sellersDataModelMongoDbMongoose,
} from "../../models/mongodb/schemas.model";
import jwt from "jsonwebtoken";
import { processedDataOfAuthenticationToken } from "../../data/types";
const makingSomeoneAdminController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    console.log(receivedData);
    const superuserKey = receivedData.IMPONEXPO_SUPERUSER_KEY;
    if (superuserKey !== IMPONEXPO_SUPERUSER_KEY) {
      throw new Error("Invalid Superuser Key!");
    }
    const emailOfTheUserWhoWillBeAdmin =
      receivedData.emailOfTheUserWhoWillBeAdmin;

    await adminDataModelMongoDbMongoose.create({
      emailOfTheAdmin: emailOfTheUserWhoWillBeAdmin,
    });
    console.log(`Successfully Made ${emailOfTheUserWhoWillBeAdmin} a Admin.`);
    response.status(200).send({
      message: "Admin Request Received Successfully",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const giveUserPermissionToSellController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { authenticationToken } = receivedData;
    const processedDataOfToken = (await jwt.verify(
      authenticationToken,
      JWT_SECRET_KEY
    )) as processedDataOfAuthenticationToken;
    const { userEmail } = processedDataOfToken;
    // CHECK IF THE USER WHO MADE THIS REQUEST IS ADMIN OR NOT-------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    const userDataInAdminDatabase = await adminDataModelMongoDbMongoose.find({
      emailOfTheAdmin: userEmail,
    });
    if (userDataInAdminDatabase.length < 1) {
      throw new Error("User is Not Admin");
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------
    // ADD THE EMAIL WHICH ADMIN PROVIDED IN THE SELLERS DATABASE----------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------------------------------------------
    const { emailOfTheUserToGivePermissionToSell } = receivedData;

    sellersDataModelMongoDbMongoose.create({
      sellerEmail: emailOfTheUserToGivePermissionToSell,
    });

    //
    response.status(200).send({
      message: "Added The User to sellers list Successfully",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};

export { makingSomeoneAdminController, giveUserPermissionToSellController };
