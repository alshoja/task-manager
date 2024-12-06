import { AppDataSource } from "../config/db";
import { Task } from "../entities/Task";

export const taskRepository = AppDataSource.getRepository(Task);
