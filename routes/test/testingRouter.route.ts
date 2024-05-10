import express from "express";
import {
  testController,
  testController2,
} from "../../controllers/test/test.controller";

const testingRouter = express.Router();
testingRouter.get("/test/1", testController);
testingRouter.get("/test/2", testController2);

export { testingRouter };
