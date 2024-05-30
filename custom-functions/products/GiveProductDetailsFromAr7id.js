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
const schemas_model_1 = require("../../models/mongodb/schemas.model");
const GiveProductDetailsFromAr7id = (ar7id_) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const productDetails = (yield schemas_model_1.productsDataModelMongoDbMongoose.findOne({
                ar7id: ar7id_,
            }));
            const { ar7idOfTheSeller } = productDetails;
            const sellerDetails = yield schemas_model_1.userDataModelMongoDbMongoose.findOne({
                ar7id: ar7idOfTheSeller,
            });
            const sellerDetails_ = sellerDetails === null || sellerDetails === void 0 ? void 0 : sellerDetails.toObject();
            delete sellerDetails_.password;
            const totalLikes = yield schemas_model_1.likesDataModelMongoDbMongoose.countDocuments({
                ar7idOfSubjectThatReceivedLike: ar7id_,
            });
            const totalComments = yield schemas_model_1.commentsDataModelMongoDbMongoose.countDocuments({
                ar7idOfSubjectWhoReceivedComment: ar7id_,
            });
            const totalFollowersOfTheSeller = yield schemas_model_1.followersDataModelMongoDbMongoose.countDocuments({
                ar7idOfTheSubjectWhichIsGettingFollowed: ar7idOfTheSeller,
            });
            const productDetailsForClient = {
                productData: productDetails,
                sellerData: sellerDetails_,
                totalLikes: totalLikes,
                totalComments: totalComments,
                totalFollowersOfTheSeller: totalFollowersOfTheSeller,
            };
            resolve(productDetailsForClient);
            resolve("");
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.default = GiveProductDetailsFromAr7id;
