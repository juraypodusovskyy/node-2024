import { NextFunction, Request, Response } from "express";

import { IPurchase } from "../interfaces/purchase.interface";
import { purchaseRepository } from "../repositories/purchase.repository";

class PurchaseController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const purchase = req.body as IPurchase;
      const newPurchase = await purchaseRepository.create(purchase);
      res.status(201).send(newPurchase);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const purchaseId = req.params.id;
      const newPurchase =
        await purchaseRepository.getPurchaseByIdWithProducts(purchaseId);
      res.status(200).send(newPurchase);
    } catch (e) {
      next(e);
    }
  }

  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const purchase = await purchaseRepository.getList();
      res.status(200).send(purchase);
    } catch (e) {
      next(e);
    }
  }
}

export const purchaseController = new PurchaseController();
