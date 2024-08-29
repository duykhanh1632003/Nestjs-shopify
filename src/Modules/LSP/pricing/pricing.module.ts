import { Module } from "@nestjs/common";
import { RegularPricing } from "./regular-pricing-stratergy.service";
import { SalePricingStrategy } from "./sale-pricing.stratergy.service";

@Module({
    providers: [RegularPricing, SalePricingStrategy],
    exports: [RegularPricing,SalePricingStrategy]
})
export class PricingModule {}