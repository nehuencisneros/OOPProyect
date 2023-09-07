import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controller";

export class ProductRouter extends BaseRouter<ProductController> {
  constructor() {
    super(ProductController);
  }

  routes() {
    this.router.get("/products", (req, res) =>
      this.controller.getAllProducts(req, res)
    );

    this.router.get("/product/:id", (req, res) =>
      this.controller.getAllProducts(req, res)
    );

    this.router.post("/createProduct", (req, res) =>
      this.controller.getAllProducts(req, res)
    );

    this.router.put("/updateProduct/:id", (req, res) =>
      this.controller.getAllProducts(req, res)
    );

    this.router.delete("/deleteProduct/:id", (req, res) =>
      this.controller.getAllProducts(req, res)
    );
  }
}
