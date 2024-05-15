"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const EnvironmentVariables_1 = require("../../data/EnvironmentVariables");
const admin_controller_1 = require("../../controllers/admin/admin.controller");
const adminRouter = express_1.default.Router();
exports.adminRouter = adminRouter;
adminRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_GIVING_PERMISSION_TO_SELL_API, admin_controller_1.giveUserPermissionToSellController);
adminRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_MAKING_SOMEONE_ADMIN_API, admin_controller_1.makingSomeoneAdminController);
adminRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_BANNING_SOMEONE_API, admin_controller_1.banUserController);
adminRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_DELETING_PRODUCTS_BY_ADMIN_API, admin_controller_1.deleteProductByAdminController);
adminRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_UNBANNING_SOMEONE_API, admin_controller_1.unBanUserController);
adminRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_APPROVING_PRODUCT_API, admin_controller_1.approveProductController);
adminRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_SEEING_USER_DETAILS_BY_ADMIN_API, admin_controller_1.seeingUserDetailsByAdminController);
adminRouter.post(EnvironmentVariables_1.SUB_ADDRESS_OF_GETTING_REPORTS_MADE_BY_USER_API, admin_controller_1.gettingReportsMadeByUserController);
