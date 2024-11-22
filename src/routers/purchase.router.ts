import { Router } from "express";

import { purchaseController } from "../controllers/purchase.controller";
import { ERole } from "../enums/role.enums";
import { ETokenType } from "../enums/tokens.enum";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { PurchaseValidator } from "../validators/purchase.validator";

const router = Router();

router.post(
  "/",
  commonMiddleware.isBodyValid(PurchaseValidator.create),
  purchaseController.create,
);

router.get(
  "/:id",
  commonMiddleware.isIdValid("id"),
  authMiddleware.checkToken(ETokenType.ACCESS),
  userMiddleware.checkRole(ERole.ADMIN),
  purchaseController.getById,
);

router.get(
  "/",
  authMiddleware.checkToken(ETokenType.ACCESS),
  userMiddleware.checkRole(ERole.ADMIN),
  purchaseController.getList,
);
export const purchaseRouter = router;
