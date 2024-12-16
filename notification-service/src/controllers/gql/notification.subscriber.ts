// import { rabbitMQ } from "../../config/Rabbitmq.config";
// import { NotificationRepository } from "../../repositories/Notification.repository";
// import { NotificationService } from "../../services/Notification.service";
// import { RabbitMQService } from "../../services/rbq/Rabbit.service";


// export class NotificationSubscriber {
//    private repository = new NotificationRepository();
//    private rabbitMQService = new RabbitMQService();
//    private notificationService = new NotificationService(repository, rabbitMQService);

//     public async listenForTaskNotifications(): Promise<void> {
//         await rabbitMQ.consumeFromQueue("task_created", async (msg) => {
//             if (!msg) return;

//             try {
//                 const notificationData = JSON.parse(msg.content.toString());
//                 await this.notificationService.createNotification(notificationData);
//                 rabbitMQ.acknowledgeMessage(msg);
//             } catch (error) {
//                 console.error("Failed to process task notification:", error);
//                 rabbitMQ.rejectMessage(msg, true);
//             }
//         });
//     }
// }
