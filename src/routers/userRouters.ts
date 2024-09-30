import { Router } from "express";

import { usercontrollers } from "../controllers/user.controller";
import { ETokenType } from "../enums/tokens.enum";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", usercontrollers.getList);
router.get(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  usercontrollers.getById,
);
router.patch(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  commonMiddleware.isBodyValid(UserValidator.update),
  usercontrollers.update,
);
router.put(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  commonMiddleware.isBodyValid(UserValidator.update),
  usercontrollers.update,
);
router.delete(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  usercontrollers.delete,
);

export const userRouters = router;
