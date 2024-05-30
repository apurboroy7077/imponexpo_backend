import mongoose from "mongoose";
import {
  databaseURL,
  databaseURL_2,
  databaseURL_3,
} from "../data/EnvironmentVariables";

const connectDB = async () => {
  await mongoose
    .connect(databaseURL_3)
    .then((response) => {
      console.log("Database is Connected");
    })
    .catch((error: any) => {
      console.log(error);
      setTimeout(() => {
        // connectDB();
      }, 3000);
    });
};
export { connectDB };
//
