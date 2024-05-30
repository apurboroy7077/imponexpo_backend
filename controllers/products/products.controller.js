"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductDetailsWithAr7idController = exports.getRandomProducts2Controller = exports.getRandomProductsController = exports.productsUploadController = void 0;
const schemas_model_1 = require("../../models/mongodb/schemas.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EnvironmentVariables_1 = require("../../data/EnvironmentVariables");
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = require("fs");
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const ar7id_1 = __importDefault(require("../../custom-functions/ar7id/ar7id"));
const GiveProductDetailsFromAr7id_1 = __importDefault(require("../../custom-functions/products/GiveProductDetailsFromAr7id"));
(0, app_1.initializeApp)(EnvironmentVariables_1.firebaseConfig);
const firebaseStorage = (0, storage_1.getStorage)();
const productsUploadController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = (0, formidable_1.default)({});
        let fields;
        let files;
        try {
            [fields, files] = yield form.parse(request);
        }
        catch (error) {
            console.log(error);
        }
        const { productName, productCategory, productPrice, priceType, productDescription, productHashtags, minimumQuantity, ageOfUsers, authenticationToken, originCountry, } = fields;
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
            const processedTokenData = jsonwebtoken_1.default.verify(authenticationTokenMain, EnvironmentVariables_1.JWT_SECRET_KEY);
            ar7idOfTheUser = processedTokenData.ar7id;
        }
        catch (error) {
            throw new Error("Authentication Failed");
        }
        // SAVE TO FIREBASE---------------------------------------------------------------------------------------------------------
        const storageRef = (0, storage_1.ref)(firebaseStorage, `files/${productImage.originalFilename + "_" + Math.random().toString()}`);
        const metadata = {
            contentType: productImage.mimetype, // mimetype MEANS TYPE OF FILE HERE, WHETHER IT IS AN IMAGE OR VIDEO OR SOMETHING ELSE---------------
        };
        let productImageBuffer = yield new Promise((resolve, reject) => {
            (0, fs_1.readFile)(productImage.filepath, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
                resolve(data);
            }));
        });
        const snapShot = yield (0, storage_1.uploadBytesResumable)(storageRef, productImageBuffer, metadata);
        const imageURL = yield (0, storage_1.getDownloadURL)(snapShot.ref);
        const processedProductDataForSavingToDatabase = {
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
            ar7id: (0, ar7id_1.default)(),
        };
        yield schemas_model_1.productsDataModelMongoDbMongoose.create(processedProductDataForSavingToDatabase);
        response.status(201).send({
            message: "Product Uploaded Successfully",
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.productsUploadController = productsUploadController;
const getRandomProductsController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        const numberOfProducts = receivedData.numberOfProducts;
        // GET RANDOM PRODUCTS FROM THE DATABASE--------------------------------------------------------------------------------------
        const productsDataFetchedFromDatabase = yield schemas_model_1.productsDataModelMongoDbMongoose.aggregate([
            { $sample: { size: numberOfProducts } },
        ]);
        response.status(200).send({
            message: "Random Products Fetching Successful",
            productsData: productsDataFetchedFromDatabase,
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.getRandomProductsController = getRandomProductsController;
const getRandomProducts2Controller = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        let { serial } = receivedData;
        serial = Number(serial);
        const skipValue = (serial - 1) * 10;
        // GET PRODUCTS DATA WHICH ARE NOT BANNED ------------------------------------------------------------------------------------
        const productsData = yield schemas_model_1.productsDataModelMongoDbMongoose.aggregate([
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
        const sellersData = yield schemas_model_1.userDataModelMongoDbMongoose.find({
            ar7id: { $in: sellersId },
        });
        let dataForClient = [];
        for (let i = 0; i < productsData.length; i++) {
            const productObject = {};
            let productData = productsData[i];
            productObject.productData = productData;
            const { ar7idOfTheSeller } = productData;
            for (let i = 0; i < sellersData.length; i++) {
                let sellerData = sellersData[i];
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
        const totalLikesData = yield schemas_model_1.likesDataModelMongoDbMongoose.aggregate([
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
        const totalCommentsData = yield schemas_model_1.commentsDataModelMongoDbMongoose.aggregate([
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
        const totalFollowersData = yield schemas_model_1.followersDataModelMongoDbMongoose.aggregate([
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
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.getRandomProducts2Controller = getRandomProducts2Controller;
const getProductDetailsWithAr7idController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedData = request.body;
        const { ar7idOfProduct } = receivedData;
        const productData = yield (0, GiveProductDetailsFromAr7id_1.default)(ar7idOfProduct);
        response.status(200).send({
            message: "Product Data Fetched Successfully.",
            productData: productData,
        });
    }
    catch (error) {
        console.log(error);
        // SENDING RESPONSE IF ANYTHING GOES WRONG---------------------------------------------------------------------
        response.status(500).send(error.message);
    }
});
exports.getProductDetailsWithAr7idController = getProductDetailsWithAr7idController;
// {
//   const newFilename = `${Date.now()}-${productImage.originalFilename}`;
//   const uploadDir = path.join(__dirname, "uploads");
//   if (!existsSync(uploadDir)) {
//     mkdirSync(uploadDir);
//   }
//   const newPath = path.join(uploadDir, newFilename);
//   renameSync(productImage.filepath, newPath);
// }
