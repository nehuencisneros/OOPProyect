"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./user/user.routes");
const config_1 = require("./config/config");
const purchase_routes_1 = require("./purchase/purchase.routes");
const purchaseProduct_routes_1 = require("./purchase/purchaseProduct.routes");
const customer_routes_1 = require("./customer/customer.routes");
const category_routes_1 = require("./category/category.routes");
const product_routes_1 = require("./products/product.routes");
class Server extends config_1.ConfigServer {
    constructor() {
        super();
        this.app = (0, express_1.default)();
        this.port = this.getNumberEnv("PORT");
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.dbConnect();
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use("/api", this.routers());
        this.listen();
    }
    routers() {
        return [
            new user_routes_1.UserRouter().router,
            new purchase_routes_1.PurchaseRouter().router,
            new purchaseProduct_routes_1.PurchaseProductRouter().router,
            new customer_routes_1.CustomerRouter().router,
            new category_routes_1.CategoryRouter().router,
            new product_routes_1.ProductRouter().router,
        ];
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening on port => " + this.port);
        });
    }
}
new Server();
