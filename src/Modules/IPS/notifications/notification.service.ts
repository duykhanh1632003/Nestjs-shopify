import { Injectable } from "@nestjs/common";
import { EmailNotification,SMSNotification ,PushNotification} from "./notification.interface";

@Injectable()
export class NotificationService {
    sendEmail(notification: EmailNotification) {
    // Logic to send email notification
  }

  sendSMS(notification: SMSNotification): void {
    // Logic to send SMS notification
  }

  sendPushNotification(notification: PushNotification): void {
    // Logic to send push notification
  }
}