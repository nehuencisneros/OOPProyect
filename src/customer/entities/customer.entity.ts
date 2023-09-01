import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity"

@Entity({name: "customer"})
export class CustomerEntity extends BaseEntity {
  @Column()
  address!:string;

  @Column()
  dni!:number;
}