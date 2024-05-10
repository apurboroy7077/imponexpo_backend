"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDataModelMongoDbMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userFullName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    countryCodeOfPhoneNumber: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: false,
    },
    countryRegion: {
        type: String,
        required: false,
    },
    reasonForSignup: {
        type: String,
        required: true,
    },
    imponexpoAccountURL: {
        type: String,
        required: false,
    },
});
const userDataModelMongoDbMongoose = mongoose_1.default.model("userData", userSchema);
exports.userDataModelMongoDbMongoose = userDataModelMongoDbMongoose;
