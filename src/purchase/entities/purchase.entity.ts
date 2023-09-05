import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";


@Entity({ name: "purchase" })
export class PurchaseEntity extends BaseEntity {
  @Column()
  status!: string;

  @Column()
  paymentMethod!: string;
}