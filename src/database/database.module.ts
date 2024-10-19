/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(configService: ConfigService)=>{
               

                const dbHost = configService.get<string>("DB_HOST");
                const dbPort = configService.get<number>("DB_PORT");
                const dbUsername = configService.get<string>("DB_USERNAME");
                const dbPassword = configService.get<string>("DB_PASSWORD");
                const dbName = configService.get<string>("DB_DATABASE");

                // Log the values to check if they are retrieved correctly
                console.log("DB_HOST:", dbHost);
                console.log("DB_PORT:", dbPort);
                console.log("DB_USERNAME:", dbUsername);
                console.log("DB_PASSWORD:", dbPassword);
                console.log("DB_DATABASE:", dbName);

                return {
                    name: "sql",
                    type: "mysql",
                    host: configService.get("DB_HOST"),
                    port: +configService.get("DB_PORT"),
                    username: configService.get("DB_USERNAME"),
                    password: configService.get("DB_PASSWORD"),
                    database: configService.get("DB_DATABASE"),
                    entities:[__dirname + '/../**/*.entity.{ts,js}'],
                    synchronize: false,
                    logging:true
                }
            }
        })
    ],
	providers: [],
	controllers: []
})
export class DatabaseModule {
    constructor(){

    }
}
