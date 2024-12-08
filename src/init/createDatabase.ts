import { Pool } from "pg";
import dotenv from "dotenv";
import { EnvConfig } from "../interfaces/env.interface";

dotenv.config();


const getEnvConfig = (): EnvConfig => {
  const config = process.env as unknown as EnvConfig;
  if (!config.DB_USER || !config.DB_PASSWORD || !config.DB_HOST || !config.DB_PORT || !config.DB_NAME) {
    throw new Error("Missing required environment variables.");
  }
  return config;
};

async function createDatabase(): Promise<void> {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = getEnvConfig();

  const client = new Pool({
    user: DB_USER,
    host: DB_HOST || "localhost",
    database: "postgres", // Default database to connect to for creation
    password: DB_PASSWORD,
    port: parseInt(DB_PORT || "5432", 10),
  });

  try {
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`Database ${DB_NAME} created successfully.`);
    } else {
      console.log(`Database ${DB_NAME} already exists.`);
    }
  } catch (err) {
    console.error("Error while creating the database:", err);
  } finally {
    await client.end();
  }
}

// PG_ADMIN_USER=root@admin.com
// PG_PASS=root
createDatabase().catch((err) => console.error("Error executing the script:", err));
