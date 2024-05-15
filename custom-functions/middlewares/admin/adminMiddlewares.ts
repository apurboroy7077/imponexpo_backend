import express from "express";
import { JWT_SECRET_KEY } from "../../../data/EnvironmentVariables";
import { processedDataOfAuthenticationToken } from "../../../data/types";
import { adminDataModelMongoDbMongoose } from "../../../models/mongodb/schemas.model";
import jwt from "jsonwebtoken";
import { resolve } from "path";
const checkIsAdmin = (request: express.Request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const receivedData = request.body;
      const { authenticationToken } = receivedData;

      const processedDataOfToken = (await jwt.verify(
        authenticationToken,
        JWT_SECRET_KEY
      )) as processedDataOfAuthenticationToken;
      const ar7idOfTheUserWhoMadeRequest = processedDataOfToken.ar7id;

      // CHECK IF THE USER WHO MADE THIS REQUEST IS ADMIN OR NOT-------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------------------------------------
      const userDataInAdminDatabase = await adminDataModelMongoDbMongoose.find({
        ar7idOfTheAdmin: ar7idOfTheUserWhoMadeRequest,
      });

      if (userDataInAdminDatabase.length < 1) {
        reject("User is Not Admin");
      }
      resolve("User is Admin, Successfully Verified.");
    } catch (error: any) {
      reject(error);
    }
  });
};
const checkIsAdmin2 = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  return new Promise((resolve, reject) => {
    const theFunction2 = async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const receivedData = request.body;
        const { authenticationToken } = receivedData;

        const processedDataOfToken = (await jwt.verify(
          authenticationToken,
          JWT_SECRET_KEY
        )) as processedDataOfAuthenticationToken;
        const ar7idOfTheUserWhoMadeRequest = processedDataOfToken.ar7id;

        // CHECK IF THE USER WHO MADE THIS REQUEST IS ADMIN OR NOT-------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------
        const userDataInAdminDatabase =
          await adminDataModelMongoDbMongoose.find({
            ar7idOfTheAdmin: ar7idOfTheUserWhoMadeRequest,
          });
        if (userDataInAdminDatabase.length < 1) {
          throw new Error("User is Not Admin");
        }
        resolve("");
        next();
      } catch (error: any) {
        console.log(error);

        reject(error);
        return;
      }
    };
    theFunction2(request, response, next);
  });
};
export { checkIsAdmin, checkIsAdmin2 };
//
