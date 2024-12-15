import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { TaskStatus } from "../utils/Task.enum";
import { Tag } from "./Tag.entity";

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

  @ManyToMany(() => Tag, (tag) => tag.tasks, { cascade: true, eager: true })
  @JoinTable({
    name: 'task_tags',
    joinColumn: { name: 'task_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' }
  })
  tags!: Tag[];

  @Column({ nullable: false })
  user_id!: number; 

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
