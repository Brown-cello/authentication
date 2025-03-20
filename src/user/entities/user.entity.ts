import { Column, Entity } from "typeorm";
import { base } from "./base.entity";

@Entity()
export class UserEntity extends base { 

@Column({nullable:true ,unique:true})
email:string

    @Column()
    password:string
}

