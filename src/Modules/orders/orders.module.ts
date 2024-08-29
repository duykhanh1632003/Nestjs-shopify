import { Module } from "@nestjs/common";
import { OrderModel } from "../database/model/order.model";
import { EmailsModule } from "../emails/emails.module";
import { OrderService } from "./orders.service";
import { OrderController } from "./orders.controller";

@Module({
    imports: [OrderModel,
        EmailsModule
    ],
    controllers: [
        OrderController
    ],
      providers: [OrderService],

})
export class OrderModule {}