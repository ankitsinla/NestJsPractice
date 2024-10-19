import { Product } from "@modules/products/entities/product.entity";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class ProductsDaoService {
	constructor(private readonly dataSource: DataSource) {}

	async getAllProducts() {
		return await this.dataSource.getRepository(Product).find();
	}

	async addProduct(product: Product) {
		return await this.dataSource.getRepository(Product).save(product);
	}

	async getProductInfoById(id: number) {
		return await this.dataSource.getRepository(Product).findOne({
			where: {
				id
			}
		});
	}
}
