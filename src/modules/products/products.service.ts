import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsDaoService } from "@modules/dao/products-dao/products-dao.service";
import { Product, ProductStatusEnum } from "./entities/product.entity";

@Injectable()
export class ProductsService {
	constructor(private readonly productDaoService: ProductsDaoService) {}

	async create(createProductDto: CreateProductDto) {
		const { name } = createProductDto;
		const product = new Product(name, ProductStatusEnum.ACTIVE);
		return await this.productDaoService.addProduct(product);
	}

	async findAll() {
		const products = await this.productDaoService.getAllProducts();
		return products;
	}

	async findOne(id: number) {
		return await this.productDaoService.getProductInfoById(id);
	}

	async update(id: number, updateProductDto: UpdateProductDto) {
		const product = await this.productDaoService.getProductInfoById(id);
		if (!product) {
			return "product not found";
		}

		const { name } = updateProductDto;
		product.name = name;
		await this.productDaoService.addProduct(product);
		return `success`;
	}

	remove(id: number) {
		return `This action removes a #${id} product`;
	}
}
