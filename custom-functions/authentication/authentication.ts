import express from "express";
import jwt from "jsonwebtoken";
const getUserAr7idFromToken = (request: express.Request) => {
  return new Promise((resolve, reject) => {
    try {
      const { authenticationToken } = request.body;
    } catch (error) {}
  });
};
export { getUserAr7idFromToken };
