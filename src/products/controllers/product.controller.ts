import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
import { ProductService } from "../service/product.service";

export class ProductController {
  constructor(
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getAllProducts (req: Request, res: Response) {
    try {
      const data = await this.productService.findAllProducts()

        if(data.length === 0) {
          return this.httpResponse.NotFound(res, "no hay productos");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }
  
  async getProductById (req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findProductById(id)

        if(!data) {
          return this.httpResponse.NotFound(res, "producto no encontrado");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }
  
  async createProduct (req: Request, res: Response) {
    const body = req.body;
    try {
      const data = await this.productService.createProduct(body)
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async updateProduct (req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;
    try {
      const data: UpdateResult = await this.productService.updateProduct(id, body);

        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Hay un error en update");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.productService.deleteProduct(id);
      
        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Hay un error en delete");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}