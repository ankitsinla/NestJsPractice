import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

@Module({
	imports: [
		WinstonModule.forRoot({
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(winston.format.timestamp(), winston.format.simple())
				}),
				new winston.transports.File({
					filename: "combined.log",
					format: winston.format.json()
				})
			]
		})
	]
})
export class LoggerModule {}
