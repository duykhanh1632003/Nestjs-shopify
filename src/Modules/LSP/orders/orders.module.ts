import { Module } from "@nestjs/common";
import { PricingModule } from "../pricing/pricing.module";
import { OrdersController } from "./orders.controller";
import { OrderService } from "src/Modules/orders/orders.service";

@Module({
    imports: [PricingModule],
    controllers:[OrdersController],
    providers: [OrderService],
})

export class LSPOrderModule {}