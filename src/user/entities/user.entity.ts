import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../config/base.entity"

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
}