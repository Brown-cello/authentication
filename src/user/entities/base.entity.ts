import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class base{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @CreateDateColumn()
    date:Date 
}
