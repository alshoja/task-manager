import { IsString, Length, IsOptional, IsNotEmpty, IsNumber } from "class-validator";

export class CreateNotificationDTO {
  @IsOptional()
  @IsNumber()
  user_id!: number;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50, { message: "Title must be between 5 and 50 characters." })
  title!: string;

  @IsOptional()
  @IsString()
  message!: string;
}
