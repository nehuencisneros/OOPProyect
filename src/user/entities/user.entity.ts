import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity"
import { CustomerEntity } from "../../customer/entities/customer.entity";

@Entity({name: "users"})
export class UserEntity extends BaseEntity {
  @Column()
  name!:string;

  @Column()
  lastName!:string;
  
  @Column()
  userName!:string;
  
  @Column()
  password!:string;
  
  @Column()
  city!:string;
  
  @Column()
  province!:string;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;
}