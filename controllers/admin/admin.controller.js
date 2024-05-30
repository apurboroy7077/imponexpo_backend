"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gettingUsersDataController = exports.gettingReportsMadeByUserController = exports.seeingUserDetailsByAdminController = exports.approveProductController = exports.unBanUserController = exports.deleteProductByAdminController = exports.banUserController = exports.giveUserPermissionToSellController = exports.makingSomeoneAdminController = void 0;
const EnvironmentVariables_1 = require("../../data/EnvironmentVariables");
const schemas_model_1 = require("../../models/mongodb/schemas.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminMiddlewares_1 = require("../../custom-functions/middlewares/admin/adminMiddlewares");
const makingSomeoneAdminController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        const superuserKey = receivedData.IMPONEXPO_SUPERUSER_KEY;
        if (superuserKey !== EnvironmentVariables_1.IMPONEXPO_SUPERUSER_KEY) {
            throw new Error("Invalid Superuser Key!");
        }
        const ar7idOfTheUserWhoWillBeAdmin = receivedData.ar7idOfTheUserWhoWillBeAdmin;
        yield schemas_model_1.adminDataModelMongoDbMongoose.create({
            ar7idOfTheAdmin: ar7idOfTheUserWhoWillBeAdmin,
        });
        console.log(`Successfully Made ${ar7idOfTheUserWhoWillBeAdmin} a Admin.`);
        response.status(200).send({
            message: "Admin Request Received Successfully",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.makingSomeoneAdminController = makingSomeoneAdminController;
const giveUserPermissionToSellController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        const { authenticationToken } = receivedData;
        const processedDataOfToken = (yield jsonwebtoken_1.default.verify(authenticationToken, EnvironmentVariables_1.JWT_SECRET_KEY));
        const { ar7id } = processedDataOfToken;
        // CHECK IF THE USER WHO MADE THIS REQUEST IS ADMIN OR NOT-------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------
        const userDataInAdminDatabase = yield schemas_model_1.adminDataModelMongoDbMongoose.find({
            ar7idOfTheAdmin: ar7id,
        });
        if (userDataInAdminDatabase.length < 1) {
            throw new Error("User is Not Admin");
        }
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        // ADD THE EMAIL WHICH ADMIN PROVIDED IN THE SELLERS DATABASE----------------------------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------------------------------------------------
        const { ar7idOfTheUserToGivePermissionToSell } = receivedData;
        yield schemas_model_1.sellersDataModelMongoDbMongoose.create({
            ar7idOfSeller: ar7idOfTheUserToGivePermissionToSell,
        });
        response.status(200).send({
            message: "Added The User to sellers list Successfully",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.giveUserPermissionToSellController = giveUserPermissionToSellController;
const banUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK IF ADMIN---------------------------------------------------------------------------------------------------
        (0, adminMiddlewares_1.checkIsAdmin)(request);
        // PUT THE USER IN BANLIST DATABASE----------------------------------------------------------------------------------
        const receivedData = request.body;
        const { ar7idOfTheUserWhoWillBeBanned } = receivedData;
        yield schemas_model_1.bannedUserDataModelMongoDbMongoose.create({
            ar7idOfTheBannedUser: ar7idOfTheUserWhoWillBeBanned,
        });
        response.status(200).send({
            message: "Banned User Successful.",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.banUserController = banUserController;
const unBanUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK ADMIN OR NOT--------------------------------------------------------------------------------------------------------
        (0, adminMiddlewares_1.checkIsAdmin)(request);
        //  Remove USER FROM BANLIST----------------------------------------------------------------------------------------------------------
        const receivedData = request.body;
        const { ar7idOfTheUserWhoWillBeUnBanned } = receivedData;
        yield schemas_model_1.bannedUserDataModelMongoDbMongoose.deleteOne({
            ar7idOfTheBannedUser: ar7idOfTheUserWhoWillBeUnBanned,
        });
        response.status(200).send({
            message: "Banned User Successful.",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.unBanUserController = unBanUserController;
const deleteProductByAdminController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        // DELETE THE PRODUCT FROM DATABASE------------------------------------------------------------------------------
        const receivedData = request.body;
        const { ar7idOfTheProductWhichWillBeDeleted } = receivedData;
        yield schemas_model_1.productsDataModelMongoDbMongoose.deleteOne({
            ar7id: ar7idOfTheProductWhichWillBeDeleted,
        });
        console.log(`${ar7idOfTheProductWhichWillBeDeleted} is deleted successfully`);
        response.status(200).send({
            message: "Deleted Product Successfully.",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.deleteProductByAdminController = deleteProductByAdminController;
const approveProductController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        // FIND THE PRODUCT FROM PRODUCTS TO BE APPROVED DATABASE------------------------------------------------------------------------------
        const receivedData = request.body;
        const { ar7idOfTheProductWhichWillBeApproved } = receivedData;
        const dataOfTheProductsToBeApproved = yield schemas_model_1.productsToBeApprovedDataModelMongoDbMongoose.find({
            ar7id: ar7idOfTheProductWhichWillBeApproved,
        });
        console.log(dataOfTheProductsToBeApproved);
        // then you insert it to the main database
        response.status(200).send({
            message: "Approved The Product Successfully",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.approveProductController = approveProductController;
const seeingUserDetailsByAdminController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        // FIND THE PRODUCT FROM PRODUCTS TO BE APPROVED DATABASE------------------------------------------------------------------------------
        const receivedData = request.body;
        const { ar7idOfTheUserOfWhichDetailsWillBeShown } = receivedData;
        console.log(ar7idOfTheUserOfWhichDetailsWillBeShown);
        const userData = yield schemas_model_1.userDataModelMongoDbMongoose.findOne({
            ar7id: ar7idOfTheUserOfWhichDetailsWillBeShown,
        });
        response.status(200).send({
            message: "Fetched User's Data Successfully",
            userData: userData,
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.seeingUserDetailsByAdminController = seeingUserDetailsByAdminController;
const gettingReportsMadeByUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        // GET REPORTS FROM DATABASE------------------------------------------------------------------------------
        const receivedData = request.body;
        const { numberOfReportsToGet } = receivedData;
        const productsFetchedFromDatabase = yield schemas_model_1.reportsDataModelMongoDbMongoose.aggregate([
            { $sample: { size: numberOfReportsToGet } },
        ]);
        response.status(200).send({
            message: "Fetched User's Reports Successfully",
            reportsData: productsFetchedFromDatabase,
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.gettingReportsMadeByUserController = gettingReportsMadeByUserController;
const gettingUsersDataController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        // GET REPORTS FROM DATABASE------------------------------------------------------------------------------
        const receivedData = request.body;
        const { pageNo } = receivedData;
        console.log(pageNo);
        console.log("GETTING USERS DATA REQUEST RECEIVED.");
        response.status(200).send({
            message: "Fetched User's Reports Successfully",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.gettingUsersDataController = gettingUsersDataController;
