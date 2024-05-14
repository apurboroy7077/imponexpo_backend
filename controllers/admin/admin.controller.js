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
exports.banUserController = exports.giveUserPermissionToSellController = exports.makingSomeoneAdminController = void 0;
const EnvironmentVariables_1 = require("../../data/EnvironmentVariables");
const schemas_model_1 = require("../../models/mongodb/schemas.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const makingSomeoneAdminController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        console.log(receivedData);
        const superuserKey = receivedData.IMPONEXPO_SUPERUSER_KEY;
        if (superuserKey !== EnvironmentVariables_1.IMPONEXPO_SUPERUSER_KEY) {
            throw new Error("Invalid Superuser Key!");
        }
        const emailOfTheUserWhoWillBeAdmin = receivedData.emailOfTheUserWhoWillBeAdmin;
        yield schemas_model_1.adminDataModelMongoDbMongoose.create({
            emailOfTheAdmin: emailOfTheUserWhoWillBeAdmin,
        });
        console.log(`Successfully Made ${emailOfTheUserWhoWillBeAdmin} a Admin.`);
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
        const { userEmail } = processedDataOfToken;
        // CHECK IF THE USER WHO MADE THIS REQUEST IS ADMIN OR NOT-------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------
        const userDataInAdminDatabase = yield schemas_model_1.adminDataModelMongoDbMongoose.find({
            emailOfTheAdmin: userEmail,
        });
        if (userDataInAdminDatabase.length < 1) {
            throw new Error("User is Not Admin");
        }
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        // ADD THE EMAIL WHICH ADMIN PROVIDED IN THE SELLERS DATABASE----------------------------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------------------------------------------------
        const { emailOfTheUserToGivePermissionToSell } = receivedData;
        yield schemas_model_1.sellersDataModelMongoDbMongoose.create({
            sellerEmail: emailOfTheUserToGivePermissionToSell,
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
        const receivedData = request.body;
        const { authenticationToken } = receivedData;
        const processedDataOfToken = (yield jsonwebtoken_1.default.verify(authenticationToken, EnvironmentVariables_1.JWT_SECRET_KEY));
        const { userEmail } = processedDataOfToken;
        // CHECK IF THE USER WHO MADE THIS REQUEST IS ADMIN OR NOT-------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------
        const userDataInAdminDatabase = yield schemas_model_1.adminDataModelMongoDbMongoose.find({
            emailOfTheAdmin: userEmail,
        });
        if (userDataInAdminDatabase.length < 1) {
            throw new Error("User is Not Admin");
        }
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        // ADD THE EMAIL WHICH ADMIN PROVIDED IN THE SELLERS DATABASE----------------------------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------------------------------------------------------------------
        const { emailOfTheUserWhoWillBeBanned } = receivedData;
        yield schemas_model_1.bannedUserDataModelMongoDbMongoose.create({
            emailOfTheBannedUser: emailOfTheUserWhoWillBeBanned,
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
