import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Order, OrderDocument } from "src/Modules/database/schema/order.schema";

@Injectable()
export class OrdersService { 
    constructor(
        @Inject(Order.name) private orderModel: Model<OrderDocument> 
    ) { }
    public async findOne(orderId: number): Promise<Order> {
    return this.orderModel.findById(orderId)
  }
}
