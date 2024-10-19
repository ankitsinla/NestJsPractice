import { Injectable } from "@nestjs/common";
import { CreateRefdocDto } from "./dto/create-refdoc.dto";
import { UpdateRefdocDto } from "./dto/update-refdoc.dto";
import { DaoService } from "@modules/dao/dao.service";
import { Refdoc } from "./entities/refdoc.entity";

@Injectable()
export class RefdocService {
	constructor(private daoService: DaoService) {}

	async create(createRefdocDto: CreateRefdocDto) {
		const { address, userId } = createRefdocDto;
		const checkUser = await this.daoService.checkById(userId);
		const user = await this.daoService.getUserData(userId);
		const refdocEntity = new Refdoc(address, user);
		const refdoc = await this.daoService.createRefdoc(refdocEntity);
		return "This action adds a new refdoc";
	}

	findAll() {
		return `This action returns all refdoc`;
	}

	async findOne(id: number) {
		const users = await this.daoService.getUserData(id);
		return users;
		// return `This action returns a #${id} refdoc`;
	}

	update(id: number, updateRefdocDto: UpdateRefdocDto) {
		return `This action updates a #${id} refdoc`;
	}

	remove(id: number) {
		return `This action removes a #${id} refdoc`;
	}
}
