import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("task_tags")
export class TaskTag {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    task_id!: number;

    @Column({ unique: true })
    tag_id!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;    
}
