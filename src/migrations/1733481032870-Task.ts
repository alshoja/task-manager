import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Task1733481032870 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "task", // Table name
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment", // auto increment id
                    },
                    {
                        name: "title",
                        type: "varchar", // Column type for title
                    },
                    {
                        name: "description",
                        type: "text", // Column type for description
                        isNullable: true, // The column can be null
                    },
                    {
                        name: "status",
                        type: "varchar", // Column type for status
                        default: "'pending'", // Default value for status
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP", // Default to the current timestamp
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP", // Default to the current timestamp
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("task"); // Drop table if migration is reverted
    }
}
