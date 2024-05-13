import express from "express";

const testController = (
  request: express.Request,
  response: express.Response
) => {
  let i = 0;

  console.log("This is Test 1");
  response.send("This is Test ");
};
const testController2 = (
  request: express.Request,
  response: express.Response
) => {
  let i = 0;

  console.log("This is Test Controller 2");
  response.send("This is Test Controller 2");
};
const crashServerController = (
  request: express.Request,
  response: express.Response
) => {
  process.exit(1);
  throw new Error("Intentional Crash For Testing Purposes");
};
export { testController, testController2, crashServerController };
