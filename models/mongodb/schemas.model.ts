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
});
const userDataModelMongoDbMongoose = mongoose.model("userData", userSchema);
export { userDataModelMongoDbMongoose };
