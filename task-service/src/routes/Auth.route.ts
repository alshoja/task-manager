import { Router } from 'express';
import { AuthController } from '../controllers/Auth.controller';
import { CreateUserDTO, LoginUserDTO } from '../dto/User.dto';
import { validateDto } from '../middlewares/Validation.middleware';
import { UserRepository } from '../repositories/User.repository';
import { AuthService } from '../services/Auth.service ';

const repository = new UserRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

const router = Router();

router.post('/register', validateDto(CreateUserDTO), controller.register.bind(controller));
router.post('/login', validateDto(LoginUserDTO), controller.login.bind(controller));

export default router;
