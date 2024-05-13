import express from "express";
import {
  SUB_ADDRESS_OF_GIVING_PERMISSION_TO_SELL_API,
  SUB_ADDRESS_OF_MAKING_SOMEONE_ADMIN_API,
} from "../../data/EnvironmentVariables";
import {
  giveUserPermissionToSellController,
  makingSomeoneAdminController,
} from "../../controllers/admin/admin.controller";

const adminRouter = express.Router();
adminRouter.post(
  SUB_ADDRESS_OF_GIVING_PERMISSION_TO_SELL_API,
  giveUserPermissionToSellController
);
adminRouter.post(
  SUB_ADDRESS_OF_MAKING_SOMEONE_ADMIN_API,
  makingSomeoneAdminController
);
export { adminRouter };