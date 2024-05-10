"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationRoutes_route_1 = require("./routes/authentication/authenticationRoutes.route");
const connectDB_1 = require("./custom-functions/connectDB");
const testingRouter_route_1 = require("./routes/test/testingRouter.route");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
// USING SOME BASIC PACKAGES STARTS-----------------------------------------------------------------------------------------------------------------------------
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
// USING SOME BASIC PACKAGES ENDS-----------------------------------------------------------------------------------------------------------------------------
// USING SOME CUSTOM MIDDLEWARE STARTS------------------------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
    setTimeout(next, 1000); // Introduce a 3-second delay before passing control to the next middleware
});
// USING SOME CUSTOM MIDDLEWARE STARTS------------------------------------------------------------------------------------------------------------------
// USING ROUTES STARTS------------------------------------------------------------------------------------------------------------------------
app.use(authenticationRoutes_route_1.authenticationRouter);
app.use(testingRouter_route_1.testingRouter);
// USING ROUTES ENDS------------------------------------------------------------------------------------------------------------------------
(0, connectDB_1.connectDB)();
exports.default = app;
