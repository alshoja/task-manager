import { Router } from 'express';
import { TaskTagController } from '../controllers/TaskTag.controller';
import { validateDto } from '../middlewares/Validation.middleware';
import { CreateTaskTagDTO } from '../dto/TaskTag.dto';
import { TaskTagRepository } from '../repositories/TaskTag.repository';
import { TaskTagService } from '../services/TaskTag.service';

const repository = new TaskTagRepository();
const service = new TaskTagService(repository);
const controller = new TaskTagController(service);

const router = Router();

router.post('/task/tags', validateDto(CreateTaskTagDTO), controller.createTaskTag.bind(controller));

export default router;
