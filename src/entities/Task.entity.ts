import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "../utils/Task.enum";


@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
