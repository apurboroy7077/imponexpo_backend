"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("../../controllers/test/test.controller");
const testingRouter = express_1.default.Router();
exports.testingRouter = testingRouter;
testingRouter.get("/test/1", test_controller_1.testController);
testingRouter.get("/test/2", test_controller_1.testController2);
testingRouter.get("/crash-server", test_controller_1.crashServerController);
