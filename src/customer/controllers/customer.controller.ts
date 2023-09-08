import { Request, Response } from "express";
import { CustomerService } from "../service/customer.service";
import { HttpResponse } from "../../shared/response/http.response";

export class CustomerController {
  constructor(
    private readonly customerService: CustomerService = new CustomerService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getAllCustomers( req: Request, res: Response) {
    try {
      const data = await this.customerService.findAllCustomers();

        if(data.length === 0) {
          return this.httpResponse.NotFound(res, "no hay customers")
        }

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getCustomerById( req: Request, res: Response) {
    const { id }= req.params;
    try {
      const data = await this.customerService.findCustomerById(id);

        if(!data) {
          return this.httpResponse.NotFound(res, "customer no encontrado")
        }

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async createCustomer(req: Request, res: Response) {
    try {
      const data = await this.customerService.createCustomer(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }

  async updateCustomer( req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req.body
    try {
      const data = await this.customerService.updateCustomer(id, body);

        if(!data.affected) {
          return this.httpResponse.NotFound(res, "error en el updateCustomer")
        }

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async deleteCustomer( req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.deleteCustomer(id);

        if(!data.affected) {
          return this.httpResponse.NotFound(res, "error en el deleteCustomer")
        }

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}