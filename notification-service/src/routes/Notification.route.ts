import { Router } from 'express';
import { NotificationController } from '../controllers/Notification.controller';
import { CreateNotificationDTO } from '../dto/Notification.dto';
import { NotificationServiceFactory } from '../factories/Notification.factory';
import { validateDto } from '../middlewares/Validation.middleware';

const notificationService = NotificationServiceFactory.create();
const controller = new NotificationController(notificationService);

const router = Router();
router.post('/notifications', validateDto(CreateNotificationDTO), controller.createNotification.bind(controller));
router.get('/notifications', controller.getAllNotifications.bind(controller));
router.get('/notifications/:id', controller.getNotificationById.bind(controller));
router.delete('/notifications/:id', controller.deleteNotification.bind(controller));

export default router;
