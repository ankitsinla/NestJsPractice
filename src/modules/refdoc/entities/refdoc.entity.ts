import { User } from "@modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Refdoc {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	address: string;

	@ManyToOne(() => User, (user) => user.id)
	user: User;

	@CreateDateColumn({ type: "datetime" })
	createdAt: Date;

	@UpdateDateColumn({ type: "datetime" })
	updatedAt: Date;

	constructor(address: string, user: User) {
		this.address = address;
		this.user = user;
	}
}
