import { Router } from 'express';
import { AuthController } from '../controllers/Auth.controller';
import { validateDto } from '../middlewares/Validation.middleware';
import { CreateUserDTO, LoginUserDTO } from '../dto/User.dto';

const router = Router();

router.post('/register', validateDto(CreateUserDTO), AuthController.register);
router.post('/login', validateDto(LoginUserDTO), AuthController.login);

export default router;
