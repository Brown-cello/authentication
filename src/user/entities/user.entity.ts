import { Column, Entity } from "typeorm";
import { base } from "./base.entity";

@Entity()
export class UserEntity extends base { 
    @Column()
    username:string

    @Column()
    password:string
}

