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
exports.checkIsAdmin2 = exports.checkIsAdmin = void 0;
const EnvironmentVariables_1 = require("../../../data/EnvironmentVariables");
const schemas_model_1 = require("../../../models/mongodb/schemas.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkIsAdmin = (request) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const receivedData = request.body;
            const { authenticationToken } = receivedData;
            const processedDataOfToken = (yield jsonwebtoken_1.default.verify(authenticationToken, EnvironmentVariables_1.JWT_SECRET_KEY));
            const ar7idOfTheUserWhoMadeRequest = processedDataOfToken.ar7id;
            // CHECK IF THE USER WHO MADE THIS REQUEST IS ADMIN OR NOT-------------------------------------------------------------------------------
            // ----------------------------------------------------------------------------------------------------------
            const userDataInAdminDatabase = yield schemas_model_1.adminDataModelMongoDbMongoose.find({
                ar7idOfTheAdmin: ar7idOfTheUserWhoMadeRequest,
            });
            if (userDataInAdminDatabase.length < 1) {
                reject("User is Not Admin");
            }
            resolve("User is Admin, Successfully Verified.");
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.checkIsAdmin = checkIsAdmin;
const checkIsAdmin2 = (request, response, next) => {
    return new Promise((resolve, reject) => {
        const theFunction2 = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const receivedData = request.body;
                const { authenticationToken } = receivedData;
                const processedDataOfToken = (yield jsonwebtoken_1.default.verify(authenticationToken, EnvironmentVariables_1.JWT_SECRET_KEY));
                const ar7idOfTheUserWhoMadeRequest = processedDataOfToken.ar7id;
                // CHECK IF THE USER WHO MADE THIS REQUEST IS ADMIN OR NOT-------------------------------------------------------------------------------
                // ----------------------------------------------------------------------------------------------------------
                const userDataInAdminDatabase = yield schemas_model_1.adminDataModelMongoDbMongoose.find({
                    ar7idOfTheAdmin: ar7idOfTheUserWhoMadeRequest,
                });
                if (userDataInAdminDatabase.length < 1) {
                    throw new Error("User is Not Admin");
                }
                resolve("");
                next();
            }
            catch (error) {
                console.log(error);
                reject(error);
                return;
            }
        });
        theFunction2(request, response, next);
    });
};
exports.checkIsAdmin2 = checkIsAdmin2;
//
