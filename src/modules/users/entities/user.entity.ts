/* eslint-disable prettier/prettier */
import { Refdoc } from "@modules/refdoc/entities/refdoc.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserType{
    B0 = "BO",
    CONSUMER = "CONSUMER",
    SUPER_BO = "SUPER_BO"
} 

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "date"
    })
    dateOfBirth: string;

    @Column({
        type:"enum",
        enum : UserType,
        default : UserType.CONSUMER
    })
    userType: UserType;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> Refdoc , (refdoc) => refdoc.user)
    refdocs: Refdoc[];
}
