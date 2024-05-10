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
  userEmail: string;
  iat: string;
};
export type {
  expressType,
  userDataSavedOnDatabaseType,
  userDataForClientSideType,
  processedDataOfAuthenticationToken,
};
