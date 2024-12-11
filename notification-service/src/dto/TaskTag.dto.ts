import { IsInt } from "class-validator";

export class CreateTaskTagDTO {
    @IsInt()
    task_id!: number;

    @IsInt()
    tag_id!: number;
}

export class UpdateTaskTagDTO extends CreateTaskTagDTO {}