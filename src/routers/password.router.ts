import { Router } from "express";

import { passwordController } from "../controllers/password.controller";
import { ETokenType } from "../enums/tokens.enum";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/forgot-password",
  commonMiddleware.isBodyValid(UserValidator.isEmailValid),
  userMiddleware.isEmailExist,
  passwordController.forgotPasswordSendEmail,
);

router.patch(
  "/forgot-password",
  commonMiddleware.isBodyValid(UserValidator.forgot),
  authMiddleware.checkActiveToken(ETokenType.FORGOT),
  passwordController.forgotPassword,
);

router.patch(
  "/change-password",
  authMiddleware.checkToken(ETokenType.ACCESS),
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  passwordController.changePassword,
);

export const passwordRouter = router;
