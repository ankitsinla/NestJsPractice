import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { DaoModule } from "@modules/dao/dao.module";

@Module({
	imports: [DaoModule],
	controllers: [ProductsController],
	providers: [ProductsService]
})
export class ProductsModule {}
