import { Router } from 'express';
import { TagController } from '../controllers/Tag.controller';
import { CreateTagDTO } from '../dto/Tag.dto';
import { validationMiddleware } from '../middlewares/Validation.middleware';

const router = Router();

router.post('/tags', validationMiddleware(CreateTagDTO), TagController.createTag);
router.get('/tags', TagController.getAllTags);

export default router;
