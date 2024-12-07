import { Router } from 'express';
import { TaskController } from '../controllers/Task.controller';
import { validationMiddleware } from '../middlewares/Validation.middleware';
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/Task.dto';

const router = Router();

router.post('/tasks', validationMiddleware(CreateTaskDTO), TaskController.createTask);
router.get('/tasks', TaskController.getAllTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.put('/tasks/:id', validationMiddleware(UpdateTaskDTO), TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

export default router;
