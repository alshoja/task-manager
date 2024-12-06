import { taskRepository } from "../repositories/TaskRepository";
import { Task } from "../entities/Task";

export const createTask = async (title: string, description?: string): Promise<Task> => {
  const newTask = taskRepository.create({ title, description });
  return await taskRepository.save(newTask);
};

export const getTasks = async (): Promise<Task[]> => {
  return await taskRepository.find();
};

export const updateTask = async (id: number, status: string): Promise<Task> => {
  const task = await taskRepository.findOneBy({ id });
  if (!task) throw new Error("Task not found");
  task.status = status;
  return await taskRepository.save(task);
};
