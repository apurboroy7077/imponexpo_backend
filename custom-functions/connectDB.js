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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EnvironmentVariables_1 = require("../data/EnvironmentVariables");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default
        .connect(EnvironmentVariables_1.databaseURL_3)
        .then((response) => {
        console.log("Database is Connected");
    })
        .catch((error) => {
        console.log(error);
        setTimeout(() => {
            // connectDB();
        }, 3000);
    });
});
exports.connectDB = connectDB;
//
