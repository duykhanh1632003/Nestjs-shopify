import { Inject, Injectable } from "@nestjs/common";
import { EmailsService } from "../emails/emails.service";
import { Order, OrderDocument } from "../database/schema/order.schema";
import { Model } from "mongoose";
import { CreateOrderDto } from "src/Dto/order/CreateOrder.dto";

@Injectable()
export class OrderService {
    constructor(
        private emailService: EmailsService,
        @Inject(Order.name) private orderModel: Model<OrderDocument> 
    ) { }
    
    async createOrder(data: CreateOrderDto): Promise<Order> {
        const createOrder = await this.orderModel.create({ ...data });
        await this.emailService.sendOrderEmail(createOrder.orderId, data.customerName);
        return createOrder;
    }
}
