import { Module } from "@nestjs/common";
import { RefdocService } from "./refdoc.service";
import { RefdocController } from "./refdoc.controller";
import { DaoModule } from "@modules/dao/dao.module";

@Module({
	imports: [DaoModule],
	controllers: [RefdocController],
	providers: [RefdocService]
})
export class RefdocModule {}
