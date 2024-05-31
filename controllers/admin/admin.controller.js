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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserPermissionToSellController = exports.unBanSubjectController = exports.gettingUserDetailsForAdminController = exports.gettingUsersDataController = exports.gettingReportsMadeByUserController = exports.seeingUserDetailsByAdminController = exports.approveProductController = exports.unBanUserController = exports.deleteProductByAdminController = exports.banSubjectController = exports.giveUserPermissionToSellController = exports.makingSomeoneAdminController = void 0;
const EnvironmentVariables_1 = require("../../data/EnvironmentVariables");
const schemas_model_1 = require("../../models/mongodb/schemas.model");
const adminMiddlewares_1 = require("../../custom-functions/middlewares/admin/adminMiddlewares");
const schemas2_model_1 = require("../../models/mongodb/schemas2.model");
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
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        const receivedData = request.body;
        const { ar7idOfTheUserToGivePermissionToSell } = receivedData;
        const timeStamp = Date.now();
        yield schemas_model_1.sellersDataModelMongoDbMongoose.create({
            ar7idOfSeller: ar7idOfTheUserToGivePermissionToSell,
            timeStamp: timeStamp,
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
const removeUserPermissionToSellController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        const receivedData = request.body;
        const { ar7idOfTheUserToRemoveSellingPermission } = receivedData;
        yield schemas_model_1.sellersDataModelMongoDbMongoose.deleteOne({
            ar7idOfSeller: ar7idOfTheUserToRemoveSellingPermission,
        });
        response.status(200).send({
            message: "Removed User's Permission of Selling Successfully.",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.removeUserPermissionToSellController = removeUserPermissionToSellController;
const banSubjectController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK IF ADMIN---------------------------------------------------------------------------------------------------
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        // PUT THE USER IN BANLIST DATABASE----------------------------------------------------------------------------------
        const receivedData = request.body;
        const { ar7idOfTheUserWhoWillBeBanned } = receivedData;
        yield schemas2_model_1.bannedSubjectDataModelMongoDbMongoose.create({
            ar7idOfTheBannedSubject: ar7idOfTheUserWhoWillBeBanned,
            timeStamp: Date.now(),
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
exports.banSubjectController = banSubjectController;
const unBanUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK ADMIN OR NOT--------------------------------------------------------------------------------------------------------
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        //  Remove USER FROM BANLIST----------------------------------------------------------------------------------------------------------
        const receivedData = request.body;
        const { ar7idOfTheUserWhoWillBeUnBanned } = receivedData;
        yield schemas2_model_1.bannedSubjectDataModelMongoDbMongoose.deleteOne({
            ar7idOfTheBannedSubject: ar7idOfTheUserWhoWillBeUnBanned,
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
const unBanSubjectController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK ADMIN OR NOT--------------------------------------------------------------------------------------------------------
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        //  Remove USER FROM BANLIST----------------------------------------------------------------------------------------------------------
        const receivedData = request.body;
        const { ar7idOfTheUserWhoWillBeUnBanned } = receivedData;
        yield schemas2_model_1.bannedSubjectDataModelMongoDbMongoose.deleteOne({
            ar7idOfTheBannedSubject: ar7idOfTheUserWhoWillBeUnBanned,
        });
        response.status(200).send({
            message: "Unbanned Successfully.",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.unBanSubjectController = unBanSubjectController;
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
        const skippingNumber = (pageNo - 1) * 10;
        const limitNumber = 10;
        const usersData = yield schemas_model_1.userDataModelMongoDbMongoose
            .find({})
            .skip(skippingNumber)
            .limit(limitNumber);
        response.status(200).send({
            message: "Fetched User's Data Successfully.",
            usersData: usersData,
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.gettingUsersDataController = gettingUsersDataController;
const gettingUserDetailsForAdminController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK IF IS ADMIN---------------------------------------------------------------------------------------------------------
        yield (0, adminMiddlewares_1.checkIsAdmin)(request);
        const receivedData = request.body;
        const { ar7idOfTheUser } = receivedData;
        const userDetails = yield schemas_model_1.userDataModelMongoDbMongoose.findOne({
            ar7id: ar7idOfTheUser,
        });
        response.status(200).send({
            message: "Fetched User's Data Successfully.",
            userDetails: userDetails,
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.gettingUserDetailsForAdminController = gettingUserDetailsForAdminController;
