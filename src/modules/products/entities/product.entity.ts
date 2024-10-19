import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ProductStatusEnum {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	OUT_OF_STOCK = "OUT_OF_STOCK"
}

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 256 })
	name: string;

	@Column({ type: "text", nullable: true })
	imageUrl?: string;

	@Column({ type: "enum", enum: ProductStatusEnum })
	status: ProductStatusEnum;

	@CreateDateColumn({ type: "datetime" })
	createdAt: Date;

	@UpdateDateColumn({ type: "datetime" })
	updatedAt: Date;

	constructor(name: string, status: ProductStatusEnum) {
		this.name = name;
		this.status = status;
	}
}
