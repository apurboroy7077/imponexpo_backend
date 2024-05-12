import express from "express";
import { authenticationRouter } from "./routes/authentication/authenticationRoutes.route";
import { connectDB } from "./custom-functions/connectDB";
import { testingRouter } from "./routes/test/testingRouter.route";
import cors from "cors";
import morgan from "morgan";
import { productsRouter } from "./routes/products/products.route";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./data/EnvironmentVariables";
const app = express();
// USING SOME BASIC PACKAGES STARTS-----------------------------------------------------------------------------------------------------------------------------

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
initializeApp(firebaseConfig);
// USING SOME BASIC PACKAGES ENDS-----------------------------------------------------------------------------------------------------------------------------
// USING SOME CUSTOM MIDDLEWARE STARTS------------------------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
  setTimeout(next, 1000); // Introduce a 3-second delay before passing control to the next middleware
});
// USING SOME CUSTOM MIDDLEWARE STARTS------------------------------------------------------------------------------------------------------------------

// USING ROUTES STARTS------------------------------------------------------------------------------------------------------------------------
app.use(authenticationRouter);
app.use(testingRouter);
app.use(productsRouter);
// USING ROUTES ENDS------------------------------------------------------------------------------------------------------------------------

connectDB();
export default app;
