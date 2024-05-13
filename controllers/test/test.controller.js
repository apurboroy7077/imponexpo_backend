"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crashServerController = exports.testController2 = exports.testController = void 0;
const testController = (request, response) => {
    let i = 0;
    console.log("This is Test 1");
    response.send("This is Test ");
};
exports.testController = testController;
const testController2 = (request, response) => {
    let i = 0;
    console.log("This is Test Controller 2");
    response.send("This is Test Controller 2");
};
exports.testController2 = testController2;
const crashServerController = (request, response) => {
    process.exit(1);
    throw new Error("Intentional Crash For Testing Purposes");
};
exports.crashServerController = crashServerController;
