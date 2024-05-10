"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashMyPassword = exports.bcrypt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.bcrypt = bcryptjs_1.default;
let saltRounds = 10;
let hashMyPassword = (plainPassword) => {
    return new Promise((resolve, reject) => {
        bcryptjs_1.default.hash(plainPassword, saltRounds, (error, hashedPassword) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            else {
                resolve(hashedPassword);
                return;
            }
        });
    });
};
exports.hashMyPassword = hashMyPassword;
let checkPassword = (plainPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        let isMatch = bcryptjs_1.default.compareSync(plainPassword, hashedPassword);
        resolve(isMatch);
    });
};
exports.checkPassword = checkPassword;
