import { Module } from "@nestjs/common";
import { ConfigurationService } from "./configuration/configuration.service";
import { ResponseInterceptorService } from "./interceptor/response/response.service";

@Module({
	providers: [ConfigurationService, ResponseInterceptorService],
	exports: [ConfigurationService]
})
export class UtilsModule {}
