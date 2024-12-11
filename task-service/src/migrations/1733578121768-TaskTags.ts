import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TaskTags1733578121768 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "task_tags",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "task_id",
                        type: "int",
                    },
                    {
                        name: "tag_id",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["task_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "tasks",
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["tag_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "tags",
                        onDelete: "CASCADE",
                    },
                ],
                indices: [
                    {
                        columnNames: ["task_id"],
                        isUnique: false,
                    },
                    {
                        columnNames: ["tag_id"],
                        isUnique: false,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("task_tags");
    }

}
