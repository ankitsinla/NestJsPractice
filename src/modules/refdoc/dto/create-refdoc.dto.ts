import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateRefdocDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiProperty()
	@IsInt()
	@Type(() => Number)
	@IsNotEmpty()
	@Min(1)
	userId: number;
}
