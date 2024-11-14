import { Router } from "express";

import { commentController } from "../controllers/comment.controller";
import { ERole } from "../enums/role.enums";
import { ETokenType } from "../enums/tokens.enum";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { productMiddleware } from "../middleware/product.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { CommentValidator } from "../validators/comment.validator";

const router = Router();

router.post(
  "/:productId",
  commonMiddleware.isIdValid("productId"),
  commonMiddleware.isBodyValid(CommentValidator.create),
  productMiddleware.isProductExistsOrThrow,
  commentController.create,
);

router.get(
  "/:productId",
  commonMiddleware.isIdValid("productId"),
  commonMiddleware.isQueryValid(CommentValidator.query),
  productMiddleware.isProductExistsOrThrow,
  commentController.getList,
);

router.delete(
  "/:productId",
  commonMiddleware.isIdValid("productId"),
  authMiddleware.checkToken(ETokenType.ACCESS),
  userMiddleware.checkRole(ERole.ADMIN),
  commentController.delete,
);

export const commentRouter = router;
