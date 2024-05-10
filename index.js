"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const EnvironmentVariables_1 = require("./data/EnvironmentVariables");
app_1.default.listen(EnvironmentVariables_1.PORT, () => {
    console.log(`Server is Started at tes http://localhost:${EnvironmentVariables_1.PORT}`);
});
