import { Controller, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { EmailNotification } from "./notification.interface";

@Controller('email')
export class EmailController {
    constructor(private readonly notificationService: NotificationService) { }
    
    @Post()
    sendEmail(notification: EmailNotification): void {
        this.notificationService.sendEmail(notification)
    }
}