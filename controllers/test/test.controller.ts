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
export { testController, testController2 };
