import { Router } from 'express';
import { TaskController } from '../controllers/Task.controller';
import { validateDto } from '../middlewares/Validation.middleware';
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/Task.dto';

const router = Router();

router.post('/tasks', validateDto(CreateTaskDTO), TaskController.createTask);
router.get('/tasks', TaskController.getAllTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.put('/tasks/:id', validateDto(UpdateTaskDTO), TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

export default router;
