import express from "express";
import {
  productsDataModelMongoDbMongoose,
  productsDataTypeForSavingInDatabase,
  userDataModelMongoDbMongoose,
} from "../../models/mongodb/schemas.model";

import jwt, { JwtPayload } from "jsonwebtoken";
import {
  JWT_SECRET_KEY,
  firebaseConfig,
} from "../../data/EnvironmentVariables";
import formidable from "formidable";
import path from "path";
import {
  existsSync,
  mkdir,
  mkdirSync,
  readFile,
  readFileSync,
  renameSync,
} from "fs";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import { arrayBuffer } from "stream/consumers";
import { processedDataOfAuthenticationToken } from "../../data/types";
import ar7id from "../../custom-functions/ar7id/ar7id";
initializeApp(firebaseConfig);
const firebaseStorage = getStorage();
const productsUploadController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const form = formidable({});
    let fields: any;
    let files: any;
    try {
      [fields, files] = await form.parse(request);
    } catch (error) {
      console.log(error);
    }
    const {
      productName,
      productCategory,
      productPrice,
      priceType,
      productDescription,
      productHashtags,
      minimumQuantity,
      ageOfUsers,
      authenticationToken,
      originCountry,
    } = fields;

    const productNameMain = productName[0];
    const productCategoryMain = productCategory[0];
    const productPriceMain = productPrice[0];
    const priceTypeMain = priceType[0];
    const productDescriptionMain = productDescription[0];
    const productHashtagsMain = productHashtags[0];
    const minimumQuantityMain = minimumQuantity[0];
    const ageOfUsersMain = ageOfUsers[0];
    const productImage = files.productImage[0];
    const authenticationTokenMain = authenticationToken[0];
    const originCountryMain = originCountry[0];
    let userEmail;
    try {
      const processedTokenData = jwt.verify(
        authenticationTokenMain,
        JWT_SECRET_KEY
      ) as processedDataOfAuthenticationToken;
      userEmail = processedTokenData.userEmail;
    } catch (error) {
      throw new Error("Authentication Failed");
    }
    // SAVE TO FIREBASE---------------------------------------------------------------------------------------------------------

    const storageRef = ref(
      firebaseStorage,
      `files/${productImage.originalFilename + "_" + Math.random().toString()}`
    );
    const metadata = {
      contentType: productImage.mimetype, // mimetype MEANS TYPE OF FILE HERE, WHETHER IT IS AN IMAGE OR VIDEO OR SOMETHING ELSE---------------
    };
    let productImageBuffer: Buffer = await new Promise((resolve, reject) => {
      readFile(productImage.filepath, async (error, data) => {
        resolve(data);
      });
    });

    const snapShot = await uploadBytesResumable(
      storageRef,
      productImageBuffer,
      metadata
    );
    const imageURL = await getDownloadURL(snapShot.ref);

    const processedProductDataForSavingToDatabase: productsDataTypeForSavingInDatabase =
      {
        productName: productNameMain,
        productCategory: productCategoryMain,
        sellerEmail: userEmail,
        price: productPriceMain,
        priceType: priceTypeMain,
        productHashtags: productHashtagsMain,
        productDescription: productDescriptionMain,
        minimumQuantityToOrder: minimumQuantityMain,
        usersAge: ageOfUsersMain,
        inStock: true,
        productOrigin: originCountryMain,
        mainImageUrl: imageURL,
        ar7id: ar7id(),
      };

    await productsDataModelMongoDbMongoose.create(
      processedProductDataForSavingToDatabase
    );

    response.status(201).send({
      message: "Product Uploaded Successfully",
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const getRandomProductsController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const numberOfProducts = receivedData.numberOfProducts;
    // GET RANDOM PRODUCTS FROM THE DATABASE--------------------------------------------------------------------------------------
    const productsDataFetchedFromDatabase =
      await productsDataModelMongoDbMongoose.aggregate([
        { $sample: { size: numberOfProducts } },
      ]);

    response.status(200).send({
      message: "Random Products Fetching Successful",
      productsData: productsDataFetchedFromDatabase,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};

export { productsUploadController, getRandomProductsController };

// {
//   const newFilename = `${Date.now()}-${productImage.originalFilename}`;
//   const uploadDir = path.join(__dirname, "uploads");
//   if (!existsSync(uploadDir)) {
//     mkdirSync(uploadDir);
//   }

//   const newPath = path.join(uploadDir, newFilename);

//   renameSync(productImage.filepath, newPath);
// }
