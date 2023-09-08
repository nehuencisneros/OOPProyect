import { NextFunction, Request, Response } from "express";
import { ProductDTO } from "../dto/product.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class ProductMiddleware {
  constructor(
    private readonly httpResponse : HttpResponse = new HttpResponse(),
  ) {}

  productValidator(req: Request, res: Response, next: NextFunction) {
    const { productName, description, price, category } =
    req.body;

    const valid = new ProductDTO()

    valid.productName = productName;
    valid.description = description;
    valid.price = price;
    valid.category = category;


    validate(valid).then((error) =>
      error.length === 0 ? this.httpResponse.Error(res, error)
        :
      next()
    )
  }
}