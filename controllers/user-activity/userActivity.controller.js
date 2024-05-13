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
exports.followSomeoneController = exports.getTotalNumberOfLikesController = exports.dislikeSomethingController = exports.checkLikeController = exports.likeSomethingController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EnvironmentVariables_1 = require("../../data/EnvironmentVariables");
const schemas_model_1 = require("../../models/mongodb/schemas.model");
const likeSomethingController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        const { authenticationToken, ar7idOfSubjectThatReceivedLike } = receivedData;
        const processedTokenData = jsonwebtoken_1.default.verify(authenticationToken, EnvironmentVariables_1.JWT_SECRET_KEY);
        const likeGiverEmail = processedTokenData.userEmail;
        const unixTimeStamp = Math.floor(Date.now() / 1000);
        const likeDataForSavingInDatabase = {
            emailOfLikeGiver: likeGiverEmail,
            ar7idOfSubjectThatReceivedLike: ar7idOfSubjectThatReceivedLike,
            unixTimeStamp: unixTimeStamp,
        };
        yield schemas_model_1.likesDataModelMongoDbMongoose.create(likeDataForSavingInDatabase);
        response.status(200).send({
            message: "Product is Liked Successfully",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.likeSomethingController = likeSomethingController;
const dislikeSomethingController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        const { authenticationToken, ar7idOfSubjectThatReceivedLike } = receivedData;
        const processedTokenData = jsonwebtoken_1.default.verify(authenticationToken, EnvironmentVariables_1.JWT_SECRET_KEY);
        const likeGiverEmail = processedTokenData.userEmail;
        yield schemas_model_1.likesDataModelMongoDbMongoose.deleteOne({
            emailOfLikeGiver: likeGiverEmail,
            ar7idOfSubjectThatReceivedLike: ar7idOfSubjectThatReceivedLike,
        });
        response.status(200).send({
            message: "Disliked Successfully",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.dislikeSomethingController = dislikeSomethingController;
const checkLikeController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        const { ar7idOfSubjectThatReceivedLike, authenticationToken } = receivedData;
        const processedData = jsonwebtoken_1.default.verify(authenticationToken, EnvironmentVariables_1.JWT_SECRET_KEY);
        const userEmail = processedData.userEmail;
        const likeDataSavedOnDatabase = yield schemas_model_1.likesDataModelMongoDbMongoose.find({
            emailOfLikeGiver: userEmail,
            ar7idOfSubjectThatReceivedLike: ar7idOfSubjectThatReceivedLike,
        });
        let likeStatus = "NOT_LIKED";
        if (likeDataSavedOnDatabase.length < 1) {
            likeStatus = "NOT_LIKED";
        }
        else if (likeDataSavedOnDatabase.length > 0) {
            likeStatus = "LIKED";
        }
        response.status(200).send({
            message: "Check Like Request Accepted Successfully",
            likeStatus: likeStatus,
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.checkLikeController = checkLikeController;
const getTotalNumberOfLikesController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        const { ar7idOfSubjectThatReceivedLike } = receivedData;
        const totalNumberOfLikes = yield schemas_model_1.likesDataModelMongoDbMongoose.countDocuments({
            ar7idOfSubjectThatReceivedLike: ar7idOfSubjectThatReceivedLike,
        });
        response.status(200).send({
            message: "Total Number of Likes Counted Successfully.",
            totalNumberOfLikes: totalNumberOfLikes,
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.getTotalNumberOfLikesController = getTotalNumberOfLikesController;
const followSomeoneController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        // const { authenticationToken, emailOfThePersonWhoIsFollowing } =
        //   receivedData;
        // const processedTokenData = jwt.verify(
        //   authenticationToken,
        //   JWT_SECRET_KEY
        // ) as processedDataOfAuthenticationToken;
        // const likeGiverEmail = processedTokenData.userEmail;
        // const unixTimeStamp = Math.floor(Date.now() / 1000);
        console.log("Follow Someone Request Received");
        response.status(200).send({
            message: "Product is Liked Successfully",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.followSomeoneController = followSomeoneController;
// {
//   const newFilename = `${Date.now()}-${productImage.originalFilename}`;
//   const uploadDir = path.join(__dirname, "uploads");
//   if (!existsSync(uploadDir)) {
//     mkdirSync(uploadDir);
//   }
//   const newPath = path.join(uploadDir, newFilename);
//   renameSync(productImage.filepath, newPath);
// }
