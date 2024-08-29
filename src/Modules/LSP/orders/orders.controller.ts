import { Controller, Get, Inject, Param } from "@nestjs/common";
import { SalePricingStrategy } from "../pricing/sale-pricing.stratergy.service";
import { PricingService } from "../pricing/pricing.service";
import { OrdersService } from "./orders.service";

@Controller('/LSP/orders')
export class OrdersController {
    constructor(
        @Inject(SalePricingStrategy)
        private pricingService: PricingService,
        private orderService: OrdersService
    ) { }
    @Get('/pricing/:id')
    public async calculateOrderPrice(@Param('id') id: string): Promise<{ price: number }> {
        const order = await this.orderService.findOne(parseInt(id))
        
        return { price: this.pricingService.calculatePrice(order.totalPrice) };

    }
}