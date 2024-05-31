import mongoose from "mongoose";
import { BANNED_SUBJECT_DATA_COLLECTION_NAME } from "./collectionNames";
// -------------------------------------------------------------------------------------------------------------------------------------------
const bannedSubjectSchema = new mongoose.Schema({
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
export const bannedSubjectDataModelMongoDbMongoose = mongoose.model(
  BANNED_SUBJECT_DATA_COLLECTION_NAME,
  bannedSubjectSchema
);
