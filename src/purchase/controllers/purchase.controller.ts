import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseService } from "../service/purchase.service";
import { Request, Response } from "express";

export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService = new PurchaseService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {} 

  async getPurchases(req: Request, res: Response){
    try {
      const data = await this.purchaseService.findAllPurchases()

        if(data.length === 0) {
          return this.httpResponse.NotFound(res, "no hay purchases")
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getPurchaseById(req: Request, res: Response){
    const { id } = req.params
    try {
      const data = await this.purchaseService.findPurchaseById(id)

        if(!data){
          return this.httpResponse.NotFound(res, "purchase no encontrado");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async createPurchase(req: Request, res: Response){
    const body = req.body;
    try {
      const data = await this.purchaseService.createPurchase(body)

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async updatePurchase(req: Request, res: Response){
    const body = req.body;
    const { id } = req.params
    try {
      const data: UpdateResult = await this.purchaseService.updatePurchase(id, body)

        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Hay un error en updatPurchase");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async deletePurchase(req: Request, res: Response){
    const { id } = req.params
    try {
      const data: DeleteResult = await this.purchaseService.deletePurchase(id)

        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Hay un error en deletePurchase");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

}