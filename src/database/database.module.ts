/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "src/config/config.module";
import { ConfigService } from "src/config/config.service";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				name: "sql",
				type: "mysql",
				host: configService.get("DB_HOST").toString(),
				port: +configService.get("DB_PORT"),
				username: configService.get("DB_USERNAME").toString(),
				password: configService.get("DB_PASSWORD").toString(),
				database: configService.get("DB_DATABASE").toString(),
				entities: [__dirname + "/../**/*.entity.{ts,js}"],
				synchronize: false,
				logging: true
			})
		})
	],
	providers: [],
	controllers: []
})
export class DatabaseModule {
	constructor() {}
}
