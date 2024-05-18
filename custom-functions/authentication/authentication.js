"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAndGiveReceivedData = exports.getUserAr7idFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EnvironmentVariables_1 = require("../../data/EnvironmentVariables");
const getUserAr7idFromToken = (request) => {
    return new Promise((resolve, reject) => {
        try {
            const { authenticationToken } = request.body;
        }
        catch (error) { }
    });
};
exports.getUserAr7idFromToken = getUserAr7idFromToken;
const authorizeAndGiveReceivedData = (request) => {
    const receivedData = request.body;
    const { authenticationToken } = receivedData;
    const processedDataOfToken = jsonwebtoken_1.default.verify(authenticationToken, EnvironmentVariables_1.JWT_SECRET_KEY);
    const ar7idOfUserWhoRequested = processedDataOfToken.ar7id;
    delete receivedData.authenticationToken;
    receivedData.ar7idOfUserWhoRequested = ar7idOfUserWhoRequested;
    return receivedData;
};
exports.authorizeAndGiveReceivedData = authorizeAndGiveReceivedData;
