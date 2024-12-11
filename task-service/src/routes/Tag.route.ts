import { Router } from 'express';
import { TagController } from '../controllers/Tag.controller';
import { CreateTagDTO } from '../dto/Tag.dto';
import { validateDto } from '../middlewares/Validation.middleware';
import { TagRepository } from '../repositories/Tag.repository';
import { TagService } from '../services/Tag.service';

const repository = new TagRepository();
const service = new TagService(repository);
const controller = new TagController(service);

const router = Router();

router.post('/tags', validateDto(CreateTagDTO), controller.createTag.bind(controller));
router.get('/tags', controller.getAllTags.bind(controller));

export default router;
