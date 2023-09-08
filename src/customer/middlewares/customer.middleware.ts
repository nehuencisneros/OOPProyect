import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";
import { CustomerDTO } from "../dto/customer.dto";

export class CustomerMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ){}
  customerValidator(req: Request, res: Response, next: NextFunction){
    const { address, dni, user } = 
    req.body;

    const valid = new CustomerDTO();

    valid.address = address;
    valid.dni = dni;
    valid.user = user;

    validate(valid).then((error) => {
      error.length === 0 ? this.httpResponse.Error(res, error)
        :
      next()
    })
  }
}