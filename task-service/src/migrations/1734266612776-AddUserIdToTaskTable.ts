import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from "typeorm";

export class AddUserIdToTaskTable1734266612776 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "tasks",
            new TableColumn({
                name: "user_id",
                type: "int",
                isNullable: false,
            })
        );

        await queryRunner.createForeignKey(
            "tasks",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );

        await queryRunner.createIndex(
            "tasks",
            new TableIndex({
                name: "IDX_TASKS_USER_ID",
                columnNames: ["user_id"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tasks");
        const foreignKey = table?.foreignKeys.find((fk) => fk.columnNames.includes("user_id"));
        if (foreignKey) {
            await queryRunner.dropForeignKey("tasks", foreignKey);
        }

        await queryRunner.dropIndex("tasks", "IDX_TASKS_USER_ID");
        await queryRunner.dropColumn("tasks", "user_id");
    }

}
