"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannedSubjectDataModelMongoDbMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collectionNames_1 = require("./collectionNames");
// -------------------------------------------------------------------------------------------------------------------------------------------
const bannedSubjectSchema = new mongoose_1.default.Schema({
    ar7idOfTheBannedSubject: {
        type: String,
        required: true,
        unique: true,
    },
    timeStamp: {
        type: String,
        required: true,
    },
});
exports.bannedSubjectDataModelMongoDbMongoose = mongoose_1.default.model(collectionNames_1.BANNED_SUBJECT_DATA_COLLECTION_NAME, bannedSubjectSchema);
