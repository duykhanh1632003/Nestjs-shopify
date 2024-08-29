// sms.controller.ts
import { Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SMSNotification } from './notification.interface';

@Controller('sms')
export class SMSController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  sendSMS(notification: SMSNotification): void {
    this.notificationService.sendSMS(notification);
  }
}
