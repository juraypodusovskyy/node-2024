import { Router } from "express";

import { authControler } from "../controllers/auth.controller";
import { ETokenType } from "../enums/tokens.enum";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  authControler.login,
);

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.isEmailExistOrThrow,
  authControler.register,
);

router.post(
  "/refresh",
  authMiddleware.checkToken(ETokenType.REFRESH),
  authControler.refresh,
);

router.patch(
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.isActiveTokenValid),
  authMiddleware.checkActiveToken(ETokenType.ACTIVATE),
  authControler.activate,
);

export const authRouter = router;
