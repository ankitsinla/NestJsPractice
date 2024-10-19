import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./modules/users/users.module";
import { RefdocModule } from "./modules/refdoc/refdoc.module";
import { DaoModule } from "@modules/dao/dao.module";
import { UtilsModule } from "./utils/utils.module";
import { APP_PIPE } from "@nestjs/core";
import { LoggerModule } from "./logger/logger.module";
import { ProductsModule } from "@modules/products/products.module";
import { ConfigModule } from "./config/config.module";

@Module({
	imports: [DatabaseModule, UsersModule, RefdocModule, DaoModule, UtilsModule, LoggerModule, ProductsModule, ConfigModule],
	controllers: [AppController],
	providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }]
})
export class AppModule {}
