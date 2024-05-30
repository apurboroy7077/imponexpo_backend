import express from "express";
type expressType = typeof express;
type userDataSavedOnDatabaseType = {
  userFullName: string;
  userEmail: string;
  countryCodeOfPhoneNumber: string;
  phoneNumber: string;
  password: string;
  accountType: string;
  companyName: string;
  countryRegion: string;
  reasonForSignup: string;
  imponexpoAccountURL: string;
};
type userDataForClientSideType = {
  _id?: string;
  userFullName: string;
  userEmail: string;
  countryCodeOfPhoneNumber: string;
  phoneNumber: string;
  password?: string;
  accountType: string;
  companyName: string;
  countryRegion: string;
  reasonForSignup: string;
  imponexpoAccountURL: string;
};
type processedDataOfAuthenticationToken = {
  ar7id: string;
  iat: number;
};
type productDataType = {
  _id: string;
  productName: string;
  productCategory: string;
  ar7idOfTheSeller: string;
  price: string;
  priceType: string;
  productHashtags: string;
  productDescription: string;
  minimumQuantityToOrder: number;
  usersAge: string;
  inStock: boolean;
  productOrigin: string;
  mainImageUrl: string;
  ar7id: string;
  __v: number;
};
type productDetailsForSendingToClientType = {
  productData: productDataType;
  sellerData: userDataForClientSideType;
  totalLikes: number;
  totalComments: number;
  totalFollowersOfTheSeller: number;
};
export type {
  expressType,
  userDataSavedOnDatabaseType,
  userDataForClientSideType,
  processedDataOfAuthenticationToken,
  productDataType,
  productDetailsForSendingToClientType,
};
