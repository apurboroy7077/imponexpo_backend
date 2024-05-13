"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUB_ADDRESS_OF_FOLLOW_SOMEONE_API = exports.SUB_ADDRESS_OF_GETTING_TOTAL_NUMBER_OF_LIKES_API = exports.SUB_ADDRESS_OF_DISLIKING_SOMETHING_API = exports.SUB_ADDRESS_OF_CHECKING_LIKE_API = exports.SUB_ADDRESS_OF_LIKE_SOMETHING_API = exports.SUB_ADDRESS_OF_GETTING_SELLER_DETAILS_FOR_CLIENT_SIDE_API = exports.SUB_ADDRESS_OF_GETTING_RANDOM_PRODUCTS_API = exports.firebaseConfig = exports.SUB_ADDRESS_OF_UPLOAD_PRODUCTS_API = exports.JWT_SECRET_KEY = exports.databaseURL_3 = exports.databaseURL_2 = exports.databaseURL = exports.PORT = void 0;
const PORT = process.env.PORT || 5001;
exports.PORT = PORT;
const databaseURL = `mongodb+srv://ar7:12345@cluster0.1g8wuka.mongodb.net/imponexpo?retryWrites=true&w=majority`;
exports.databaseURL = databaseURL;
const databaseURL_2 = `mongodb+srv://ar7:12345@cluster0.1g8wuka.mongodb.net/imponexpo?retryWrites=true&w=majority&appName=Cluster0`;
exports.databaseURL_2 = databaseURL_2;
const databaseURL_3 = `mongodb+srv://ar7:12345@cluster0.1g8wuka.mongodb.net/imponexpo?retryWrites=true&w=majority`;
exports.databaseURL_3 = databaseURL_3;
const JWT_SECRET_KEY = "grill-chicken-is-very-tasty";
exports.JWT_SECRET_KEY = JWT_SECRET_KEY;
const SUB_ADDRESS_OF_UPLOAD_PRODUCTS_API = "/products/upload/api";
exports.SUB_ADDRESS_OF_UPLOAD_PRODUCTS_API = SUB_ADDRESS_OF_UPLOAD_PRODUCTS_API;
const firebaseConfig = {
    apiKey: "AIzaSyDtMentULJpS0aG4F1aOZJDXeGQa9EjWM4",
    authDomain: "weaponizear7.firebaseapp.com",
    projectId: "weaponizear7",
    storageBucket: "weaponizear7.appspot.com",
    messagingSenderId: "228513748912",
    appId: "1:228513748912:web:60b17d70f8ab5fbd52a875",
    measurementId: "G-ML16TT1Y1L",
};
exports.firebaseConfig = firebaseConfig;
const SUB_ADDRESS_OF_GETTING_RANDOM_PRODUCTS_API = "/products/get-random-products/api";
exports.SUB_ADDRESS_OF_GETTING_RANDOM_PRODUCTS_API = SUB_ADDRESS_OF_GETTING_RANDOM_PRODUCTS_API;
const SUB_ADDRESS_OF_GETTING_SELLER_DETAILS_FOR_CLIENT_SIDE_API = "/authentication/get-seller-details-for-client-side/api";
exports.SUB_ADDRESS_OF_GETTING_SELLER_DETAILS_FOR_CLIENT_SIDE_API = SUB_ADDRESS_OF_GETTING_SELLER_DETAILS_FOR_CLIENT_SIDE_API;
const SUB_ADDRESS_OF_LIKE_SOMETHING_API = "/user-activity/like/api";
exports.SUB_ADDRESS_OF_LIKE_SOMETHING_API = SUB_ADDRESS_OF_LIKE_SOMETHING_API;
const SUB_ADDRESS_OF_CHECKING_LIKE_API = "/user-activity/check-like/api";
exports.SUB_ADDRESS_OF_CHECKING_LIKE_API = SUB_ADDRESS_OF_CHECKING_LIKE_API;
const SUB_ADDRESS_OF_DISLIKING_SOMETHING_API = "/user-activity/dislike/api";
exports.SUB_ADDRESS_OF_DISLIKING_SOMETHING_API = SUB_ADDRESS_OF_DISLIKING_SOMETHING_API;
const SUB_ADDRESS_OF_GETTING_TOTAL_NUMBER_OF_LIKES_API = "/user-activity/get-total-number-of-likes/api";
exports.SUB_ADDRESS_OF_GETTING_TOTAL_NUMBER_OF_LIKES_API = SUB_ADDRESS_OF_GETTING_TOTAL_NUMBER_OF_LIKES_API;
const SUB_ADDRESS_OF_FOLLOW_SOMEONE_API = "/user-activity/follow-someone/api";
exports.SUB_ADDRESS_OF_FOLLOW_SOMEONE_API = SUB_ADDRESS_OF_FOLLOW_SOMEONE_API;
