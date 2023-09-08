import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./user/user.routes";
import { ConfigServer } from "./config/config";
import { PurchaseRouter } from "./purchase/purchase.routes";
import { PurchaseProductRouter } from "./purchase/purchaseProduct.routes";
import { CustomerRouter } from "./customer/customer.routes";
import { CategoryRouter } from "./category/category.routes";
import { ProductRouter } from "./products/product.routes";


class Server extends ConfigServer{
  public app: express.Application = express();
  private port: number = this.getNumberEnv("PORT");

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.dbConnect();
    
    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.app.use("/api", this.routers());
    this.listen();
  }

  routers(): Array<express.Router> {
    return [
      new UserRouter().router,
      new PurchaseRouter().router,
      new PurchaseProductRouter().router,
      new CustomerRouter().router,
      new CategoryRouter().router,
      new ProductRouter().router,
    ];
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port => " + this.port);
    });
  }
}

new Server();