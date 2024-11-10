import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ETokenType } from "../enums/tokens.enum";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  authController.login,
);

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.isEmailExistOrThrow,
  authController.register,
);

router.post(
  "/refresh",
  authMiddleware.checkToken(ETokenType.REFRESH),
  authController.refresh,
);

router.post(
  "/logout",
  authMiddleware.checkToken(ETokenType.ACCESS),
  authController.logout,
);

router.patch(
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.isActiveTokenValid),
  authMiddleware.checkActiveToken(ETokenType.ACTIVATE),
  authController.activate,
);

export const authRouter = router;
