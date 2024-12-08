import { Router } from 'express';
import { TagController } from '../controllers/Tag.controller';
import { CreateTagDTO } from '../dto/Tag.dto';
import { validateDto } from '../middlewares/Validation.middleware';

const router = Router();

router.post('/tags', validateDto(CreateTagDTO), TagController.createTag);
router.get('/tags', TagController.getAllTags);

export default router;
