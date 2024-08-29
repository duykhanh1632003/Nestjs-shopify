import { Injectable } from "@nestjs/common";
import { PricingService } from "./pricing.service";

@Injectable()
export class RegularPricing implements PricingService {
    public calculatePrice(basePrice: number): number {
        return basePrice
    }
    public fetchInternalPricing(): void {
        
    }
}