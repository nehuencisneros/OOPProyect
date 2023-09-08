import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseProductDTO } from "../dto/purchase-product.dto";
import { PurchaseProductEntity } from "../entities/purchase-product.entity";
import { ProductService } from "../../products/service/product.service";

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor( private readonly productService : ProductService = new ProductService()) {
    super(PurchaseProductEntity);
  }

  async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
    return (await this.execRepository).find();
  }

  async findPurchaseProductById(
    id: string
  ): Promise<PurchaseProductEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createPurchaseProduct(
    body: PurchaseProductDTO
  ): Promise<PurchaseProductEntity> {
    const newPurProd = (await this.execRepository).create(body)

    const product = await this.productService.findProductById(newPurProd.product.id)
    
    newPurProd.totalPrice = product!.price * newPurProd.quantityProduct;
    return (await this.execRepository).save(newPurProd);
  }

  async deletePurchaseProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

  async updatePurchaseProduct(
    id: string,
    infoUpdate: PurchaseProductDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }


}