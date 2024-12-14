import { AppDataSource } from "./Db.config";

async function runMigrations() {
    try {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
        console.log("Migrations executed successfully.");
        await AppDataSource.destroy();
    } catch (error) {
        console.error("Error running migrations:", error);
    }
}

runMigrations();