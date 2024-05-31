import express from "express";
import {
  IMPONEXPO_SUPERUSER_KEY,
  JWT_SECRET_KEY,
} from "../../data/EnvironmentVariables";
import {
  adminDataModelMongoDbMongoose,
  bannedUserDataModelMongoDbMongoose,
  productsDataModelMongoDbMongoose,
  productsToBeApprovedDataModelMongoDbMongoose,
  reportsDataModelMongoDbMongoose,
  sellersDataModelMongoDbMongoose,
  userDataModelMongoDbMongoose,
} from "../../models/mongodb/schemas.model";
import jwt from "jsonwebtoken";
import { processedDataOfAuthenticationToken } from "../../data/types";
import {
  checkIsAdmin,
  checkIsAdmin2,
} from "../../custom-functions/middlewares/admin/adminMiddlewares";
import { bannedSubjectDataModelMongoDbMongoose } from "../../models/mongodb/schemas2.model";

const makingSomeoneAdminController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;

    const superuserKey = receivedData.IMPONEXPO_SUPERUSER_KEY;
    if (superuserKey !== IMPONEXPO_SUPERUSER_KEY) {
      throw new Error("Invalid Superuser Key!");
    }
    const ar7idOfTheUserWhoWillBeAdmin =
      receivedData.ar7idOfTheUserWhoWillBeAdmin;

    await adminDataModelMongoDbMongoose.create({
      ar7idOfTheAdmin: ar7idOfTheUserWhoWillBeAdmin,
    });
    console.log(`Successfully Made ${ar7idOfTheUserWhoWillBeAdmin} a Admin.`);
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
    await checkIsAdmin(request);
    const receivedData = request.body;

    const { ar7idOfTheUserToGivePermissionToSell } = receivedData;
    const timeStamp = Date.now();
    await sellersDataModelMongoDbMongoose.create({
      ar7idOfSeller: ar7idOfTheUserToGivePermissionToSell,
      timeStamp: timeStamp,
    });

    response.status(200).send({
      message: "Added The User to sellers list Successfully",
    });
  } catch (error: any) {
    console.log(error);

    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const removeUserPermissionToSellController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    await checkIsAdmin(request);
    const receivedData = request.body;
    const { ar7idOfTheUserToRemoveSellingPermission } = receivedData;
    await sellersDataModelMongoDbMongoose.deleteOne({
      ar7idOfSeller: ar7idOfTheUserToRemoveSellingPermission,
    });

    response.status(200).send({
      message: "Removed User's Permission of Selling Successfully.",
    });
  } catch (error: any) {
    console.log(error);

    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const banSubjectController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    // CHECK IF ADMIN---------------------------------------------------------------------------------------------------
    await checkIsAdmin(request);
    // PUT THE USER IN BANLIST DATABASE----------------------------------------------------------------------------------

    const receivedData = request.body;
    const { ar7idOfTheUserWhoWillBeBanned } = receivedData;

    await bannedSubjectDataModelMongoDbMongoose.create({
      ar7idOfTheBannedSubject: ar7idOfTheUserWhoWillBeBanned,
      timeStamp: Date.now(),
    });

    response.status(200).send({
      message: "Banned User Successful.",
    });
  } catch (error: any) {
    console.log(error);

    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const unBanUserController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    // CHECK ADMIN OR NOT--------------------------------------------------------------------------------------------------------
    await checkIsAdmin(request);
    //  Remove USER FROM BANLIST----------------------------------------------------------------------------------------------------------
    const receivedData = request.body;
    const { ar7idOfTheUserWhoWillBeUnBanned } = receivedData;
    await bannedSubjectDataModelMongoDbMongoose.deleteOne({
      ar7idOfTheBannedSubject: ar7idOfTheUserWhoWillBeUnBanned,
    });
    response.status(200).send({
      message: "Banned User Successful.",
    });
  } catch (error: any) {
    console.log(error);

    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const unBanSubjectController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    // CHECK ADMIN OR NOT--------------------------------------------------------------------------------------------------------

    await checkIsAdmin(request);
    //  Remove USER FROM BANLIST----------------------------------------------------------------------------------------------------------
    const receivedData = request.body;
    const { ar7idOfTheUserWhoWillBeUnBanned } = receivedData;
    await bannedSubjectDataModelMongoDbMongoose.deleteOne({
      ar7idOfTheBannedSubject: ar7idOfTheUserWhoWillBeUnBanned,
    });
    response.status(200).send({
      message: "Unbanned Successfully.",
    });
  } catch (error: any) {
    console.log(error);

    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const deleteProductByAdminController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
    await checkIsAdmin(request);
    // DELETE THE PRODUCT FROM DATABASE------------------------------------------------------------------------------
    const receivedData = request.body;
    const { ar7idOfTheProductWhichWillBeDeleted } = receivedData;
    await productsDataModelMongoDbMongoose.deleteOne({
      ar7id: ar7idOfTheProductWhichWillBeDeleted,
    });

    console.log(
      `${ar7idOfTheProductWhichWillBeDeleted} is deleted successfully`
    );

    response.status(200).send({
      message: "Deleted Product Successfully.",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const approveProductController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
    await checkIsAdmin(request);
    // FIND THE PRODUCT FROM PRODUCTS TO BE APPROVED DATABASE------------------------------------------------------------------------------
    const receivedData = request.body;
    const { ar7idOfTheProductWhichWillBeApproved } = receivedData;
    const dataOfTheProductsToBeApproved =
      await productsToBeApprovedDataModelMongoDbMongoose.find({
        ar7id: ar7idOfTheProductWhichWillBeApproved,
      });
    console.log(dataOfTheProductsToBeApproved);
    // then you insert it to the main database
    response.status(200).send({
      message: "Approved The Product Successfully",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const seeingUserDetailsByAdminController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
    await checkIsAdmin(request);
    // FIND THE PRODUCT FROM PRODUCTS TO BE APPROVED DATABASE------------------------------------------------------------------------------
    const receivedData = request.body;
    const { ar7idOfTheUserOfWhichDetailsWillBeShown } = receivedData;
    console.log(ar7idOfTheUserOfWhichDetailsWillBeShown);
    const userData = await userDataModelMongoDbMongoose.findOne({
      ar7id: ar7idOfTheUserOfWhichDetailsWillBeShown,
    });

    response.status(200).send({
      message: "Fetched User's Data Successfully",
      userData: userData,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const gettingReportsMadeByUserController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
    await checkIsAdmin(request);
    // GET REPORTS FROM DATABASE------------------------------------------------------------------------------
    const receivedData = request.body;
    const { numberOfReportsToGet } = receivedData;
    const productsFetchedFromDatabase =
      await reportsDataModelMongoDbMongoose.aggregate([
        { $sample: { size: numberOfReportsToGet } },
      ]);
    response.status(200).send({
      message: "Fetched User's Reports Successfully",
      reportsData: productsFetchedFromDatabase,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const gettingUsersDataController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
    await checkIsAdmin(request);
    // GET REPORTS FROM DATABASE------------------------------------------------------------------------------
    const receivedData = request.body;
    const { pageNo } = receivedData;
    const skippingNumber = (pageNo - 1) * 10;
    const limitNumber = 10;
    const usersData = await userDataModelMongoDbMongoose
      .find({})
      .skip(skippingNumber)
      .limit(limitNumber);

    response.status(200).send({
      message: "Fetched User's Data Successfully.",
      usersData: usersData,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const gettingUserDetailsForAdminController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
    await checkIsAdmin(request);
    const receivedData = request.body;
    const { ar7idOfTheUser } = receivedData;
    const userDetails = await userDataModelMongoDbMongoose.findOne({
      ar7id: ar7idOfTheUser,
    });

    response.status(200).send({
      message: "Fetched User's Data Successfully.",
      userDetails: userDetails,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};

export {
  makingSomeoneAdminController,
  giveUserPermissionToSellController,
  banSubjectController,
  deleteProductByAdminController,
  unBanUserController,
  approveProductController,
  seeingUserDetailsByAdminController,
  gettingReportsMadeByUserController,
  gettingUsersDataController,
  gettingUserDetailsForAdminController,
  unBanSubjectController,
  removeUserPermissionToSellController,
};
