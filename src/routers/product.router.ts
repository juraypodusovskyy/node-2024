import { Router } from "express";

import { productController } from "../controllers/product.controller";
import { EFileType } from "../enums/file-item-type.enum";
import { ERole } from "../enums/role.enums";
import { ETokenType } from "../enums/tokens.enum";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { filemiddleware } from "../middleware/file.middleware";
import { productMiddleware } from "../middleware/product.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { ProductValidator } from "../validators/product.validator";

const router = Router();

router.post(
  "/",
  commonMiddleware.isBodyValid(ProductValidator.create),
  authMiddleware.checkToken(ETokenType.ACCESS),
  userMiddleware.checkRole(ERole.SELLER),
  productController.create,
);

router.patch(
  "/photo/:id",
  commonMiddleware.isIdValid("id"),
  filemiddleware.isFileValid(EFileType.PRODUCTS),
  authMiddleware.checkToken(ETokenType.ACCESS),
  productMiddleware.isProductSeller,
  productController.updatePhoto,
);

export const productRouter = router;
