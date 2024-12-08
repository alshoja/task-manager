import { Router } from 'express';
import { TaskTagController } from '../controllers/TaskTag.controller';
import { validateDto } from '../middlewares/Validation.middleware';
import { CreateTaskTagDTO } from '../dto/TaskTag.dto';

const router = Router();

router.post('/task/tags', validateDto(CreateTaskTagDTO), TaskTagController.createTaskTag);

export default router;
