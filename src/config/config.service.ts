import { Injectable, Logger } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import { resolve } from "path";
import * as fs from "fs";
import { parse } from "dotenv";
import { EnvConfig, envSchema } from "./validation.types";

@Injectable()
export class ConfigService extends NestConfigService {
	private readonly Logger = new Logger(ConfigService.name);

	private readonly configs: EnvConfig;

	constructor(filePath: string) {
		super();

		console.log("filepath ", filePath);

		const _PATH = resolve(filePath);
		const envConfigs: any = parse(fs.readFileSync(_PATH));
		this.Logger.log(`Loading ENV----> [${filePath}] : PATH:${_PATH}\n\n`);

		Object.keys(envConfigs).map((configKey) => (envConfigs[configKey] = envConfigs[configKey].toString()));
		// process.env =

		this.configs = ConfigService.validateInput(envConfigs);

		console.log("conog", this.configs);
		console.log(this.get("DB_HOST"));
	}

	private static validateInput(envConfig: EnvConfig): EnvConfig {
		const { error, value: validatedEnvConfig } = envSchema.validate(envConfig);
		if (error) {
			throw new Error(`Config validation error: ${error.message}`);
		}
		return validatedEnvConfig;
	}

	public get(key: keyof EnvConfig) {
		return this.configs[key];
	}
}
