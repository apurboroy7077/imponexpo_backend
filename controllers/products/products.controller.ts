import express from "express";
import {
  commentsDataModelMongoDbMongoose,
  followersDataModelMongoDbMongoose,
  likesDataModelMongoDbMongoose,
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
import GiveProductDetailsFromAr7id from "../../custom-functions/products/GiveProductDetailsFromAr7id";
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
    let ar7idOfTheUser;
    try {
      const processedTokenData = jwt.verify(
        authenticationTokenMain,
        JWT_SECRET_KEY
      ) as processedDataOfAuthenticationToken;
      ar7idOfTheUser = processedTokenData.ar7id;
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
        ar7idOfTheSeller: ar7idOfTheUser,
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
const getRandomProducts2Controller = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    let { serial } = receivedData;
    serial = Number(serial);
    const skipValue = (serial - 1) * 10;
    // GET PRODUCTS DATA WHICH ARE NOT BANNED ------------------------------------------------------------------------------------
    const productsData = await productsDataModelMongoDbMongoose.aggregate([
      {
        $lookup: {
          from: "banned_products_data",
          localField: "ar7id",
          foreignField: "ar7idOfTheBannedProduct",
          as: "bannedInfo",
        },
      },
      { $match: { bannedInfo: { $eq: [] } } },
      {
        $skip: skipValue,
      },
      {
        $limit: 10,
      },
      {
        $project: {
          bannedInfo: 0,
        },
      },
    ]);
    // GET SELLERS DETAILS-------------------------------------------------------------------------------------------------------------------
    let sellersId = [];
    for (let i = 0; i < productsData.length; i++) {
      const singleProductData = productsData[i];
      const { ar7idOfTheSeller } = singleProductData;
      let isAlreadyExists = false;
      for (let i = 0; i < sellersId.length; i++) {
        const singleSellerId = sellersId[i];
        if (singleSellerId === ar7idOfTheSeller) {
          isAlreadyExists = true;
        }
      }
      if (isAlreadyExists === false) {
        sellersId.push(ar7idOfTheSeller);
      }
    }
    const sellersData = await userDataModelMongoDbMongoose.find({
      ar7id: { $in: sellersId },
    });
    let dataForClient = [];
    for (let i = 0; i < productsData.length; i++) {
      const productObject: any = {};
      let productData = productsData[i];
      productObject.productData = productData;
      const { ar7idOfTheSeller } = productData;
      for (let i = 0; i < sellersData.length; i++) {
        let sellerData: any = sellersData[i];
        sellerData = sellerData.toObject();
        delete sellerData.password;
        const { ar7id } = sellerData;
        if (ar7id === ar7idOfTheSeller) {
          productObject.sellerData = sellerData;
        }
      }
      dataForClient.push(productObject);
    }
    const productsId = [];
    for (let i = 0; i < productsData.length; i++) {
      const productData = productsData[i];
      const { ar7id } = productData;
      productsId.push(ar7id);
    }
    // Find Like Comment -----------------------------------------------------------------------------------------------------

    const totalLikesData = await likesDataModelMongoDbMongoose.aggregate([
      { $match: { ar7idOfSubjectThatReceivedLike: { $in: productsId } } },
      {
        $group: { _id: "$ar7idOfSubjectThatReceivedLike", count: { $sum: 1 } },
      },
    ]);

    for (let i = 0; i < dataForClient.length; i++) {
      const data = dataForClient[i];
      data.totalLikes = 0;
      const ar7idOfProduct = data.productData.ar7id;
      for (let i = 0; i < totalLikesData.length; i++) {
        const ar7id_ = totalLikesData[i]._id;
        const totalLikes = totalLikesData[i].count;
        if (ar7id_ === ar7idOfProduct) {
          data.totalLikes = totalLikes;
        }
      }
    }
    // Find Total Comments ------------------------------------------------------------------------------------------------------------
    const totalCommentsData = await commentsDataModelMongoDbMongoose.aggregate([
      { $match: { ar7idOfSubjectWhoReceivedComment: { $in: productsId } } },
      {
        $group: {
          _id: "$ar7idOfSubjectWhoReceivedComment",
          count: { $sum: 1 },
        },
      },
    ]);

    for (let i = 0; i < dataForClient.length; i++) {
      const data = dataForClient[i];
      data.totalComments = 0;
      const ar7idOfProduct = data.productData.ar7id;
      for (let i = 0; i < totalCommentsData.length; i++) {
        const ar7id_ = totalCommentsData[i]._id;
        const totalComments = totalCommentsData[i].count;
        if (ar7id_ === ar7idOfProduct) {
          data.totalComments = totalComments;
        }
      }
    }
    // Find Total Followers ----------------------------------------------------------------------------------------------------------------------
    const totalFollowersData =
      await followersDataModelMongoDbMongoose.aggregate([
        {
          $match: {
            ar7idOfTheSubjectWhichIsGettingFollowed: { $in: sellersId },
          },
        },
        {
          $group: {
            _id: "$ar7idOfTheSubjectWhichIsGettingFollowed",
            count: { $sum: 1 },
          },
        },
      ]);

    for (let i = 0; i < dataForClient.length; i++) {
      const data = dataForClient[i];
      data.totalFollowersOfTheSeller = 0;
      const ar7idOfSeller = data.sellerData.ar7id;

      for (let i = 0; i < totalFollowersData.length; i++) {
        const ar7id_ = totalFollowersData[i]._id;
        const totalFollowers = totalFollowersData[i].count;
        if (ar7id_ === ar7idOfSeller) {
          data.totalFollowersOfTheSeller = totalFollowers;
        }
      }
    }
    console.log(dataForClient);
    response.status(200).send({
      message: "Random Products Fetching Successful",
      productsData: dataForClient,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
const getProductDetailsWithAr7idController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const receivedData = request.body;
    const { ar7idOfProduct } = receivedData;
    const productData = await GiveProductDetailsFromAr7id(ar7idOfProduct);

    response.status(200).send({
      message: "Product Data Fetched Successfully.",
      productData: productData,
    });
  } catch (error: any) {
    console.log(error);
    // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
    response.status(500).send(error.message);
  }
};
export {
  productsUploadController,
  getRandomProductsController,
  getRandomProducts2Controller,
  getProductDetailsWithAr7idController,
};

// {
//   const newFilename = `${Date.now()}-${productImage.originalFilename}`;
//   const uploadDir = path.join(__dirname, "uploads");
//   if (!existsSync(uploadDir)) {
//     mkdirSync(uploadDir);
//   }

//   const newPath = path.join(uploadDir, newFilename);

//   renameSync(productImage.filepath, newPath);
// }
