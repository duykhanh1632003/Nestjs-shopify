import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailsService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // SMTP server của bạn
      port: 587,
      secure: false, // true cho port 465, false cho các port khác
      auth: {
        user: 'your-email@example.com', // Email của bạn
        pass: 'your-email-password', // Mật khẩu email của bạn
      },
    });
  }

  public async sendOrderEmail(orderId: string, customerEmail: string) {
    const mailOptions = {
      from: '"Your Shop Name" <your-email@example.com>', // Sender address
      to: customerEmail, // List of receivers
      subject: 'Order Confirmation', // Subject line
      text: `Your order ${orderId} has been placed successfully.`, // Plain text body
      html: `<p>Your order <strong>${orderId}</strong> has been placed successfully.</p>`, // HTML body
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
