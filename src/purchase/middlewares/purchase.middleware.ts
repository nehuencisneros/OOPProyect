import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseDTO } from "../dto/purchase.dto";
import { validate } from "class-validator";

export class PurchaseMiddleware{
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  purchaseValidator(req: Request, res: Response, next: NextFunction) {
    const { paymentMethod, status, customer } = req.body;

    const valid = new PurchaseDTO()

    valid.paymentMethod = paymentMethod;
    valid.status = status;
    valid.customer = customer;

    validate(valid).then((error) => 
      error.length > 0 ? this.httpResponse.Error(res, error)
        : 
      next()
    )
  }
}