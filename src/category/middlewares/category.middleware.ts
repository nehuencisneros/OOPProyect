import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { validate } from "class-validator";
import { CategoryDTO } from "../dto/category.dto";

export class CategoryMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  categoryValidator(req: Request, res: Response, next: NextFunction){
    const { categoryName } = req.body

    const valid = new CategoryDTO()

    valid.categoryName = categoryName;

    validate(valid).then((error) => 
      error.length > 0 ? this.httpResponse.Error(res, error)
        : 
      next()
    )
  }
}