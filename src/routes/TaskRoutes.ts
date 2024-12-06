import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { Task } from '../entities/Task';
import { validationMiddleware } from '../middlewares/ValidationMiddleware';

const router = Router();

router.post('/tasks',validationMiddleware(Task), TaskController.createTask);
router.get('/tasks', TaskController.getAllTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.put('/tasks/:id', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

export default router;
