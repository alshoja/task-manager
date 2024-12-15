import { Router } from 'express';
import { NotificationController } from '../controllers/Notification.controller';
import { CreateNotificationDTO } from '../dto/Notification.dto';
import { validateDto } from '../middlewares/Validation.middleware';
import { NotificationRepository } from '../repositories/Notification.repository';
import { NotificationService } from '../services/Notification.service';
import { RabbitMQService } from '../services/rbq/Rabbit.service';


const repository = new NotificationRepository();
const rabbitMQService = new RabbitMQService();
const service = new NotificationService(repository, rabbitMQService);
const controller = new NotificationController(service);

const router = Router();

router.post('/notifications', validateDto(CreateNotificationDTO), controller.createNotification.bind(controller));
router.get('/notifications', controller.getAllNotifications.bind(controller));
router.get('/notifications/:id', controller.getNotificationById.bind(controller));
router.delete('/notifications/:id', controller.deleteNotification.bind(controller));

export default router;
