import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controllers/category.controller";

export class CategoryRouter extends BaseRouter<CategoryController> {
  constructor() {
    super(CategoryController);
  }

  routes():void {


  }
}