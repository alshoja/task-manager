import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Task1733481032870 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks", 
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment", 
                    },
                    {
                        name: "title",
                        type: "varchar", 
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true, 
                    },
                    {
                        name: "status",
                        type: "varchar",
                        default: "'pending'", 
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
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks"); 
    }
}
