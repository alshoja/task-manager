import { Router } from 'express';
import { TaskController } from '../controllers/Task.controller';
import { validateDto } from '../middlewares/Validation.middleware';
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/Task.dto';
import { TaskRepository } from '../repositories/Task.repository';
import { TaskService } from '../services/Task.service';

const repository = new TaskRepository();
const service = new TaskService(repository);
const controller = new TaskController(service);

const router = Router();

router.post('/tasks', validateDto(CreateTaskDTO), controller.createTask.bind(controller));
router.get('/tasks', controller.getAllTasks.bind(controller));
router.get('/tasks/:id', controller.getTaskById.bind(controller));
router.put('/tasks/:id', validateDto(UpdateTaskDTO), controller.updateTask.bind(controller));
router.delete('/tasks/:id', controller.deleteTask.bind(controller));

export default router;
