import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";

@Module({
    imports: [CacheModule.register(
        {
        ttl: 60,
        max: 100
        }
    )]
})

export class CacheModules {}