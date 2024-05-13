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
const likesSchema = new mongoose.Schema({
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
const followerSchema = new mongoose.Schema({
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
const commentSchema = new mongoose.Schema({
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
const selllerSchema = new mongoose.Schema({
  sellerEmail: {
    type: String,
    required: true,
    unique: true,
  },
});
const adminSchema = new mongoose.Schema({
  emailOfTheAdmin: {
    type: String,
    required: true,
    unique: true,
  },
});
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
export {
  userDataModelMongoDbMongoose,
  productsDataModelMongoDbMongoose,
  likesDataModelMongoDbMongoose,
  followersDataModelMongoDbMongoose,
  sellersDataModelMongoDbMongoose,
  adminDataModelMongoDbMongoose,
};

type productsDataTypeForSavingInDatabase = {
  productName: string;
  productCategory: string;
  sellerEmail: string;
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
  unixTimeStamp: number;
};
type followersDataTypeForSavingInDatabase = {
  emailOfThePersonWhoIsGettingFollowed: string;
  emailOfThePersonWhoIsFollowing: string;
  unixTimeStamp: number;
};
export type {
  productsDataTypeForSavingInDatabase,
  likeDatatypeForSavingInDatabase,
  followersDataTypeForSavingInDatabase,
};
