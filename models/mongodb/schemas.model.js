"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followersDataModelMongoDbMongoose = exports.likesDataModelMongoDbMongoose = exports.productsDataModelMongoDbMongoose = exports.userDataModelMongoDbMongoose = void 0;
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
    profilePictureSrc: {
        type: String,
        required: false,
    },
});
const productSchema = new mongoose_1.default.Schema({
    productName: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    sellerEmail: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    priceType: {
        type: String,
        required: true,
    },
    productHashtags: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    minimumQuantityToOrder: {
        type: String,
        required: true,
    },
    usersAge: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    productOrigin: {
        type: String,
        required: true,
    },
    mainImageUrl: {
        type: String,
        required: true,
    },
    ar7id: {
        type: String,
        required: true,
        unique: true,
    },
});
const likesSchema = new mongoose_1.default.Schema({
    emailOfLikeGiver: {
        type: String,
        required: true,
    },
    ar7idOfSubjectThatReceivedLike: {
        type: String,
        required: true,
        unique: true,
    },
    unixTimeStamp: {
        type: Number,
        required: true,
    },
});
const followerSchema = new mongoose_1.default.Schema({
    emailOfThePersonWhoIsGettingFollowed: {
        type: String,
        required: true,
    },
    emailOfThePersonWhoIsFollowing: {
        type: String,
        required: true,
        unique: true,
    },
    unixTimeStamp: {
        type: Number,
        required: true,
    },
});
const commentSchema = new mongoose_1.default.Schema({
    idOfCommentGiver: {
        type: String,
        required: true,
    },
    idOfSubjectWhoReceivedComment: {
        type: String,
        required: true,
    },
    comment: {},
});
const userDataModelMongoDbMongoose = mongoose_1.default.model("userData", userSchema);
exports.userDataModelMongoDbMongoose = userDataModelMongoDbMongoose;
const productsDataModelMongoDbMongoose = mongoose_1.default.model("productsDatas", productSchema);
exports.productsDataModelMongoDbMongoose = productsDataModelMongoDbMongoose;
const likesDataModelMongoDbMongoose = mongoose_1.default.model("likesData", likesSchema);
exports.likesDataModelMongoDbMongoose = likesDataModelMongoDbMongoose;
const commentsDataModelMongoDbMongoose = mongoose_1.default.model("commentsData", commentSchema);
const followersDataModelMongoDbMongoose = mongoose_1.default.model("followersData", followerSchema);
exports.followersDataModelMongoDbMongoose = followersDataModelMongoDbMongoose;
