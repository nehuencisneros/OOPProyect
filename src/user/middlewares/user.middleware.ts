import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class UserMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ){}
  userValidator(req: Request, res: Response, next: NextFunction){
    const { name, lastName, userName, email, password, city, province, role } = 
    req.body;
  
    const valid = new UserDTO();

    valid.name = name;
    valid.lastname = lastName;
    valid.username = userName;
    valid.email = email;
    valid.password = password;
    valid.city = city;
    valid.province = province;
    valid.role = role;

    validate(valid).then((error) => {
      error.length > 0 ? this.httpResponse.Error(res, error)
        : 
      next()
    })
  }
}