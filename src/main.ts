import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";
import { ResponseInterceptorService } from "@utils/interceptor/response/response.service";
import { ConfigService } from "./config/config.service";
import { CommonExceptionFilter } from "@utils/filters/common-exception/common-exception.filter";
import { AppLoggerService } from "./logger/logger.service";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.use([cookieParser(), compression()]);
	app.enableCors();
	app.useGlobalInterceptors(new ResponseInterceptorService());
	const logger: Logger = new Logger(bootstrap.name);
	const configService: ConfigService = app.get<ConfigService>(ConfigService);
	app.useGlobalFilters(new CommonExceptionFilter(new AppLoggerService(configService)));

	await app.listen(3001, () => {
		Logger.log("application running", "MAIN");
		logger.log("system started");
		logger.log(`PORT:${3001}`);
	});
}
bootstrap();
