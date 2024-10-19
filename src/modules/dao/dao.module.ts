import { Module } from "@nestjs/common";
import { DaoService } from "./dao.service";
import { ProductsDaoService } from "./products-dao/products-dao.service";

@Module({
	providers: [DaoService, ProductsDaoService],
	exports: [DaoService, ProductsDaoService]
})
export class DaoModule {}
