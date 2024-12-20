import { IsString, Length, IsOptional, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { TaskStatus } from "../utils/Task.enum";

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 50, { message: "Title must be between 5 and 50 characters." })
  title!: string;

  @IsOptional()
  @IsString()
  @Length(10, 200, { message: "Description must be between 10 and 200 characters if provided." })
  description?: string;

  @IsEnum(TaskStatus, { message: "Status must be one of: OPEN, IN_PROGRESS, DONE." })
  status?: string;

  @IsNumber()
  @IsNotEmpty()
  user_id!: number;
}

export class UpdateTaskDTO {
  @IsOptional()
  @Length(5, 50, { message: "Title must be between 5 and 50 characters." })
  title?: string;

  @IsOptional()
  @IsString()
  @Length(10, 200, { message: "Description must be between 10 and 200 characters if provided." })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: "Status must be one of: OPEN, IN_PROGRESS, DONE." })
  status?: string;
}
