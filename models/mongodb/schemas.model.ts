import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
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
const productSchema = new mongoose.Schema({
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
const likesSchema = new mongoose.Schema({
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
likesSchema.index(
  { ar7idOfLikeGiver: 1, ar7idOfSubjectThatReceivedLike: 1 },
  { unique: true }
);
const followerSchema = new mongoose.Schema({
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
followerSchema.index(
  {
    ar7idOfTheSubjectWhichIsGettingFollowed: 1,
    ar7idOfTheSubjectWhichIsFollowing: 1,
  },
  { unique: true }
);
const commentSchema = new mongoose.Schema({
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
const selllerSchema = new mongoose.Schema({
  ar7idOfSeller: {
    type: String,
    required: true,
    unique: true,
  },
});
const adminSchema = new mongoose.Schema({
  ar7idOfTheAdmin: {
    type: String,
    required: true,
    unique: true,
  },
});
const bannedUserSchema = new mongoose.Schema({
  ar7idOfTheBannedUser: {
    type: String,
    required: true,
    unique: true,
  },
});
const reportsSchema = new mongoose.Schema({
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
const userDataModelMongoDbMongoose = mongoose.model("userData", userSchema);
const productsDataModelMongoDbMongoose = mongoose.model(
  "productsDatas",
  productSchema
);
const likesDataModelMongoDbMongoose = mongoose.model("likesData", likesSchema);
const commentsDataModelMongoDbMongoose = mongoose.model(
  "commentsData",
  commentSchema
);
const followersDataModelMongoDbMongoose = mongoose.model(
  "followersData",
  followerSchema
);
const sellersDataModelMongoDbMongoose = mongoose.model(
  "sellerData",
  selllerSchema
);
const adminDataModelMongoDbMongoose = mongoose.model("adminData", adminSchema);
const bannedUserDataModelMongoDbMongoose = mongoose.model(
  "bannedUsersData",
  bannedUserSchema
);
const productsToBeApprovedDataModelMongoDbMongoose = mongoose.model(
  "productsToBeApprovedData",
  productSchema
);
const reportsDataModelMongoDbMongoose = mongoose.model(
  "reportsMadeByUsersData",
  reportsSchema
);
export {
  userDataModelMongoDbMongoose,
  productsDataModelMongoDbMongoose,
  likesDataModelMongoDbMongoose,
  followersDataModelMongoDbMongoose,
  sellersDataModelMongoDbMongoose,
  adminDataModelMongoDbMongoose,
  bannedUserDataModelMongoDbMongoose,
  productsToBeApprovedDataModelMongoDbMongoose,
  reportsDataModelMongoDbMongoose,
  commentsDataModelMongoDbMongoose,
};

type productsDataTypeForSavingInDatabase = {
  productName: string;
  productCategory: string;
  ar7idOfTheSeller: string;
  price: string;
  priceType: string;
  productHashtags: string;
  productDescription: string;
  minimumQuantityToOrder: string;
  usersAge: string;
  inStock: boolean;
  productOrigin: string;
  mainImageUrl: string;
  ar7id: string;
};
type likeDatatypeForSavingInDatabase = {
  emailOfLikeGiver: string;
  ar7idOfSubjectThatReceivedLike: string;
  timeStamp: number;
};
type followersDataTypeForSavingInDatabase = {
  ar7idOfThePersonWhoIsGettingFollowed: string;
  ar7idOfThePersonWhoIsFollowing: string;
  timeStamp: number;
};
export type {
  productsDataTypeForSavingInDatabase,
  likeDatatypeForSavingInDatabase,
  followersDataTypeForSavingInDatabase,
};
