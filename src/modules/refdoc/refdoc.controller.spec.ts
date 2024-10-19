import { Test, TestingModule } from "@nestjs/testing";
import { RefdocController } from "./refdoc.controller";
import { RefdocService } from "./refdoc.service";

describe("RefdocController", () => {
	let controller: RefdocController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RefdocController],
			providers: [RefdocService]
		}).compile();

		controller = module.get<RefdocController>(RefdocController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
