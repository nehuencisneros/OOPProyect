import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseProductService } from "../service/purchase-product.service";
import { Request, Response } from "express";

export class PurchaseProductController {
  constructor(
    private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {} 

  async getAllPurchaseProducts(req: Request, res: Response){
    try {
      const data = await this.purchaseProductService.findAllPurchaseProducts()

        if(data.length === 0) {
          return this.httpResponse.NotFound(res, "no hay purchases")
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async getPurchaseProductById(req: Request, res: Response){
    const { id } = req.params
    try {
      const data = await this.purchaseProductService.findPurchaseProductById(id)

        if(!data){
          return this.httpResponse.NotFound(res, "purchase no encontrado");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async createPurchaseProduct(req: Request, res: Response){
    const body = req.body;
    try {
      const data = await this.purchaseProductService.createPurchaseProduct(body)

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async updatePurchaseProduct(req: Request, res: Response){
    const body = req.body;
    const { id } = req.params
    try {
      const data: UpdateResult = await this.purchaseProductService.updatePurchaseProduct(id, body)

        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Hay un error en updatPurchaseProduct");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async deletePurchaseProduct(req: Request, res: Response){
    const { id } = req.params
    try {
      const data: DeleteResult = await this.purchaseProductService.deletePurchaseProduct(id)

        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Hay un error en deletePurchaseProduct");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

}