import { HttpResponse } from "../../shared/response/http.response";
import { Request, Response } from "express";
import { CategoryService } from "../service/category.service";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getAllCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.findAllCategories();

      if(data.length === 0) {
        return this.httpResponse.NotFound(res, "no hay categorias")
      }

    return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryById(id);

        if(!data){
          return this.httpResponse.NotFound(res, "categoria no encontrada");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async createCategory(req: Request, res: Response) {
    const body = req.body;
    try {
      const data = await this.categoryService.createCategory(body);

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;
    try {
      const data = await this.categoryService.updateCategory(id, body);

        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Hay un error en updateCategory");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.deleteCategory(id);

        if (!data.affected) {
          return this.httpResponse.NotFound(res, "Hay un error en deleteCategory");
        }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

}