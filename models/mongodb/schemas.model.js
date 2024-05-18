"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsDataModelMongoDbMongoose = exports.reportsDataModelMongoDbMongoose = exports.productsToBeApprovedDataModelMongoDbMongoose = exports.bannedUserDataModelMongoDbMongoose = exports.adminDataModelMongoDbMongoose = exports.sellersDataModelMongoDbMongoose = exports.followersDataModelMongoDbMongoose = exports.likesDataModelMongoDbMongoose = exports.productsDataModelMongoDbMongoose = exports.userDataModelMongoDbMongoose = void 0;
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
    ar7id: {
        type: String,
        required: true,
        unique: true,
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
    ar7idOfTheSeller: {
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
    ar7idOfLikeGiver: {
        type: String,
        required: true,
    },
    ar7idOfSubjectThatReceivedLike: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Number,
        required: true,
    },
});
likesSchema.index({ ar7idOfLikeGiver: 1, ar7idOfSubjectThatReceivedLike: 1 }, { unique: true });
const followerSchema = new mongoose_1.default.Schema({
    ar7idOfTheSubjectWhichIsGettingFollowed: {
        type: String,
        required: true,
    },
    ar7idOfTheSubjectWhichIsFollowing: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Number,
        required: true,
    },
});
followerSchema.index({
    ar7idOfTheSubjectWhichIsGettingFollowed: 1,
    ar7idOfTheSubjectWhichIsFollowing: 1,
}, { unique: true });
const commentSchema = new mongoose_1.default.Schema({
    ar7idOfCommentGiver: {
        type: String,
        required: true,
    },
    ar7idOfSubjectWhoReceivedComment: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: String,
        required: true,
    },
});
commentSchema.index({ ar7idOfSubjectWhoReceivedComment: 1 });
commentSchema.index({ ar7idOfCommentGiver: 1 });
const selllerSchema = new mongoose_1.default.Schema({
    ar7idOfSeller: {
        type: String,
        required: true,
        unique: true,
    },
});
const adminSchema = new mongoose_1.default.Schema({
    ar7idOfTheAdmin: {
        type: String,
        required: true,
        unique: true,
    },
});
const bannedUserSchema = new mongoose_1.default.Schema({
    ar7idOfTheBannedUser: {
        type: String,
        required: true,
        unique: true,
    },
});
const reportsSchema = new mongoose_1.default.Schema({
    ar7idOfThePersonWhoReported: {
        type: String,
        required: true,
    },
    reportMessage: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Number,
        required: true,
    },
});
// DATAMODELS STARTS HERE---------------------------------------------------------------------------------------------------------------------------------------
const userDataModelMongoDbMongoose = mongoose_1.default.model("userData", userSchema);
exports.userDataModelMongoDbMongoose = userDataModelMongoDbMongoose;
const productsDataModelMongoDbMongoose = mongoose_1.default.model("productsDatas", productSchema);
exports.productsDataModelMongoDbMongoose = productsDataModelMongoDbMongoose;
const likesDataModelMongoDbMongoose = mongoose_1.default.model("likesData", likesSchema);
exports.likesDataModelMongoDbMongoose = likesDataModelMongoDbMongoose;
const commentsDataModelMongoDbMongoose = mongoose_1.default.model("commentsData", commentSchema);
exports.commentsDataModelMongoDbMongoose = commentsDataModelMongoDbMongoose;
const followersDataModelMongoDbMongoose = mongoose_1.default.model("followersData", followerSchema);
exports.followersDataModelMongoDbMongoose = followersDataModelMongoDbMongoose;
const sellersDataModelMongoDbMongoose = mongoose_1.default.model("sellerData", selllerSchema);
exports.sellersDataModelMongoDbMongoose = sellersDataModelMongoDbMongoose;
const adminDataModelMongoDbMongoose = mongoose_1.default.model("adminData", adminSchema);
exports.adminDataModelMongoDbMongoose = adminDataModelMongoDbMongoose;
const bannedUserDataModelMongoDbMongoose = mongoose_1.default.model("bannedUsersData", bannedUserSchema);
exports.bannedUserDataModelMongoDbMongoose = bannedUserDataModelMongoDbMongoose;
const productsToBeApprovedDataModelMongoDbMongoose = mongoose_1.default.model("productsToBeApprovedData", productSchema);
exports.productsToBeApprovedDataModelMongoDbMongoose = productsToBeApprovedDataModelMongoDbMongoose;
const reportsDataModelMongoDbMongoose = mongoose_1.default.model("reportsMadeByUsersData", reportsSchema);
exports.reportsDataModelMongoDbMongoose = reportsDataModelMongoDbMongoose;
