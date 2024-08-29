import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { EmailsService } from "../emails/emails.service";
import { CreateOrderDto } from "src/Dto/order/CreateOrder.dto";

@Controller('/orders')
export class OrderController {
    constructor(
        private orderService: OrderService,
    ) { }
    
    @Post()
    public async createOrder(@Body() createOrder: CreateOrderDto) {
        const createOrders = await this.orderService.createOrder(createOrder)
        return {
        message: 'Thanks for you order!',
        orderNumber: createOrders.orderId,
        };
    }
}