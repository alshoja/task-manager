import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsString()
  @Length(5, 50, { message: "Title must be between 5 and 50 characters." })
  @Column()
  title!: string;

  @IsOptional()
  @IsString()
  @Length(10, 200, { message: "Description must be between 10 and 200 characters if provided." })
  @Column({ nullable: true })
  description?: string;

  @IsEnum(TaskStatus, { message: "Status must be one of: OPEN, IN_PROGRESS, DONE." })
  @Column({ default: "pending" })
  status?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
