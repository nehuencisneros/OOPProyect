import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseProductDTO } from "../dto/purchase-product.dto";
import { validate } from "class-validator";

export class PurchaseProductMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(), 
  ) {}

  purchaseProductValidator(req: Request, res: Response, next: NextFunction){
    const { quantityProduct, product, totalPrice, purchase, } = req.body

    const valid = new PurchaseProductDTO()

    valid.quantityProduct = quantityProduct;
    valid.totalPrice = totalPrice;
    valid.purchase = purchase; 
    valid.product = product;

    validate(valid).then((error) => {
      error.length > 0 ? this.httpResponse.Error(res, error)
        :
      next()
    })
  }
}