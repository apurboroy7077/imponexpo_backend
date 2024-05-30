import express from "express";
import {
  SUB_ADDRESS_OF_APPROVING_PRODUCT_API,
  SUB_ADDRESS_OF_BANNING_SOMEONE_API,
  SUB_ADDRESS_OF_DELETING_PRODUCTS_BY_ADMIN_API,
  SUB_ADDRESS_OF_GETTING_REPORTS_MADE_BY_USER_API,
  SUB_ADDRESS_OF_GIVING_PERMISSION_TO_SELL_API,
  SUB_ADDRESS_OF_MAKING_SOMEONE_ADMIN_API,
  SUB_ADDRESS_OF_SEEING_USER_DETAILS_BY_ADMIN_API,
  SUB_ADDRESS_OF_UNBANNING_SOMEONE_API,
} from "../../data/EnvironmentVariables";
import {
  approveProductController,
  banUserController,
  deleteProductByAdminController,
  gettingReportsMadeByUserController,
  gettingUsersDataController,
  giveUserPermissionToSellController,
  makingSomeoneAdminController,
  seeingUserDetailsByAdminController,
  unBanUserController,
} from "../../controllers/admin/admin.controller";
import { SUB_ADDRESS_OF_GETTING_USERS_DATA_FOR_ADMIN_API } from "../../data/ApiAddresses";

const adminRouter = express.Router();
adminRouter.post(
  SUB_ADDRESS_OF_GIVING_PERMISSION_TO_SELL_API,
  giveUserPermissionToSellController
);
adminRouter.post(
  SUB_ADDRESS_OF_MAKING_SOMEONE_ADMIN_API,
  makingSomeoneAdminController
);
adminRouter.post(SUB_ADDRESS_OF_BANNING_SOMEONE_API, banUserController);
adminRouter.post(
  SUB_ADDRESS_OF_DELETING_PRODUCTS_BY_ADMIN_API,
  deleteProductByAdminController
);
adminRouter.post(SUB_ADDRESS_OF_UNBANNING_SOMEONE_API, unBanUserController);
adminRouter.post(
  SUB_ADDRESS_OF_APPROVING_PRODUCT_API,
  approveProductController
);
adminRouter.post(
  SUB_ADDRESS_OF_SEEING_USER_DETAILS_BY_ADMIN_API,
  seeingUserDetailsByAdminController
);
adminRouter.post(
  SUB_ADDRESS_OF_GETTING_REPORTS_MADE_BY_USER_API,
  gettingReportsMadeByUserController
);
adminRouter.post(
  SUB_ADDRESS_OF_GETTING_USERS_DATA_FOR_ADMIN_API,
  gettingUsersDataController
);
export { adminRouter };
