import { Router } from "express";

import { usercontrollers } from "../controllers/user.controller";
import { EFileType } from "../enums/file-item-type.enum";
import { ETokenType } from "../enums/tokens.enum";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { filemiddleware } from "../middleware/file.middleware";
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
router.patch(
  "/avatar",
  authMiddleware.checkToken(ETokenType.ACCESS),
  filemiddleware.isFileValid(EFileType.USERS),
  usercontrollers.uploadAvatar,
);

export const userRouters = router;
