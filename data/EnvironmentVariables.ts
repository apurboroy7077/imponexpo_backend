const PORT = 5001;
const databaseURL = `mongodb+srv://ar7:12345@cluster0.1g8wuka.mongodb.net/imponexpo?retryWrites=true&w=majority`;
const databaseURL_2 = `mongodb+srv://ar7:12345@cluster0.1g8wuka.mongodb.net/imponexpo?retryWrites=true&w=majority&appName=Cluster0`;
const databaseURL_3 = `mongodb+srv://ar7:12345@cluster0.1g8wuka.mongodb.net/imponexpo?retryWrites=true&w=majority`;
const JWT_SECRET_KEY = "grill-chicken-is-very-tasty";
const SUB_ADDRESS_OF_UPLOAD_PRODUCTS_API = "/products/upload/api";
const firebaseConfig = {
  apiKey: "AIzaSyDtMentULJpS0aG4F1aOZJDXeGQa9EjWM4",
  authDomain: "weaponizear7.firebaseapp.com",
  projectId: "weaponizear7",
  storageBucket: "weaponizear7.appspot.com",
  messagingSenderId: "228513748912",
  appId: "1:228513748912:web:60b17d70f8ab5fbd52a875",
  measurementId: "G-ML16TT1Y1L",
};
const SUB_ADDRESS_OF_GETTING_RANDOM_PRODUCTS_API =
  "/products/get-random-products/api";
const SUB_ADDRESS_OF_GETTING_SELLER_DETAILS_FOR_CLIENT_SIDE_API =
  "/authentication/get-seller-details-for-client-side/api";
export {
  PORT,
  databaseURL,
  databaseURL_2,
  databaseURL_3,
  JWT_SECRET_KEY,
  SUB_ADDRESS_OF_UPLOAD_PRODUCTS_API,
  firebaseConfig,
  SUB_ADDRESS_OF_GETTING_RANDOM_PRODUCTS_API,
  SUB_ADDRESS_OF_GETTING_SELLER_DETAILS_FOR_CLIENT_SIDE_API,
};
