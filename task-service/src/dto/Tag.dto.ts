import { IsString, Length, IsOptional, IsEnum, isNotEmpty, IsNotEmpty } from "class-validator";

export class CreateTagDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50, { message: "Name must be between 5 and 50 characters." })
  name!: string;
}

export class UpdateTagDTO {
  @IsOptional()
  @Length(2, 50, { message: "Name must be between 5 and 50 characters." })
  name?: string;
}
