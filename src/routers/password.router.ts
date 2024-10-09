import { Router } from "express";

import { passwordcontroller } from "../controllers/password.controller";
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
  passwordcontroller.forgotPasswordSendEmail,
);

router.patch(
  "/forgot-password",
  commonMiddleware.isBodyValid(UserValidator.forgot),
  authMiddleware.checkActiveToken(ETokenType.FORGOT),
  passwordcontroller.forgotPassword,
);

router.patch(
  "/change-password",
  authMiddleware.checkToken(ETokenType.ACCESS),
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  passwordcontroller.changePassword,
);

export const passwordRouter = router;
