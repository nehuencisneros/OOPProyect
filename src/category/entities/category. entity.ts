import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../products/entities/products.entity";

@Entity({ name: "category" })
export class CategoryEntity extends BaseEntity {
  @Column()
  categoryName!: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products!: ProductEntity[];
}