import { Router } from "express";

import { userControllers } from "../controllers/user.controller";
import { EFileType } from "../enums/file-item-type.enum";
import { ETokenType } from "../enums/tokens.enum";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { fileMiddleware } from "../middleware/file.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get(
  "/",
  commonMiddleware.isQueryValid(UserValidator.listQuery),
  userControllers.getList,
);
router.get(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  userControllers.getById,
);
router.patch(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  commonMiddleware.isBodyValid(UserValidator.update),
  userControllers.update,
);
router.put(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  commonMiddleware.isBodyValid(UserValidator.update),
  userControllers.update,
);
router.delete(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  userControllers.delete,
);
router.patch(
  "/avatar",
  authMiddleware.checkToken(ETokenType.ACCESS),
  fileMiddleware.isFileValid(EFileType.USERS),
  userControllers.uploadAvatar,
);

export const userRouters = router;
