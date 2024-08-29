import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { SMSController } from "./sms.controller";
import { PushNotificationController } from "./push-notification.controller";
import { EmailController } from "./email.controller";

@Module({
    providers: [NotificationService],
    controllers: [SMSController, PushNotificationController, EmailController]
})

export class NotificationModule {}