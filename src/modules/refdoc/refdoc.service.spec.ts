import { Test, TestingModule } from "@nestjs/testing";
import { RefdocService } from "./refdoc.service";

describe("RefdocService", () => {
	let service: RefdocService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RefdocService]
		}).compile();

		service = module.get<RefdocService>(RefdocService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
