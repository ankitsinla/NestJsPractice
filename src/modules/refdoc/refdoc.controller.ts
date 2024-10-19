import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { RefdocService } from "./refdoc.service";
import { CreateRefdocDto } from "./dto/create-refdoc.dto";
import { UpdateRefdocDto } from "./dto/update-refdoc.dto";

@Controller("refdoc")
export class RefdocController {
	constructor(private readonly refdocService: RefdocService) {}

	@Post()
	create(@Body() createRefdocDto: CreateRefdocDto) {
		return this.refdocService.create(createRefdocDto);
	}

	@Get()
	findAll() {
		return this.refdocService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.refdocService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateRefdocDto: UpdateRefdocDto) {
		return this.refdocService.update(+id, updateRefdocDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.refdocService.remove(+id);
	}
}
