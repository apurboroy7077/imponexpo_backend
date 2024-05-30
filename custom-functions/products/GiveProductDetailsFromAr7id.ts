import {
  productDataType,
  productDetailsForSendingToClientType,
  userDataForClientSideType,
} from "../../data/types";
import {
  commentsDataModelMongoDbMongoose,
  followersDataModelMongoDbMongoose,
  likesDataModelMongoDbMongoose,
  productsDataModelMongoDbMongoose,
  sellersDataModelMongoDbMongoose,
  userDataModelMongoDbMongoose,
} from "../../models/mongodb/schemas.model";
import ar7id from "../ar7id/ar7id";

const GiveProductDetailsFromAr7id = (ar7id_: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productDetails = (await productsDataModelMongoDbMongoose.findOne({
        ar7id: ar7id_,
      })) as productDataType;
      const { ar7idOfTheSeller } = productDetails;
      const sellerDetails = await userDataModelMongoDbMongoose.findOne({
        ar7id: ar7idOfTheSeller,
      });
      const sellerDetails_ =
        sellerDetails?.toObject() as userDataForClientSideType;
      delete sellerDetails_.password;
      const totalLikes = await likesDataModelMongoDbMongoose.countDocuments({
        ar7idOfSubjectThatReceivedLike: ar7id_,
      });
      const totalComments =
        await commentsDataModelMongoDbMongoose.countDocuments({
          ar7idOfSubjectWhoReceivedComment: ar7id_,
        });
      const totalFollowersOfTheSeller =
        await followersDataModelMongoDbMongoose.countDocuments({
          ar7idOfTheSubjectWhichIsGettingFollowed: ar7idOfTheSeller,
        });
      const productDetailsForClient: productDetailsForSendingToClientType = {
        productData: productDetails,
        sellerData: sellerDetails_,
        totalLikes: totalLikes,
        totalComments: totalComments,
        totalFollowersOfTheSeller: totalFollowersOfTheSeller,
      };
      resolve(productDetailsForClient);
      resolve("");
    } catch (error) {
      reject(error);
    }
  });
};

export default GiveProductDetailsFromAr7id;
