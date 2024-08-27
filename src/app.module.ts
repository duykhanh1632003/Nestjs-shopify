import {  MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './Middleware/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { UserModule } from './Modules/user/user.module';
import { HealthController } from './health/health.controller';
import { ProductModule } from './Modules/product/product.module';
import { ConfigsModule } from './config/configs.module';
import { DatabaseModule } from './config/database.module';
import { ThrottlerModules } from './config/throttler.module';
import { CacheModules } from './cache/cache.module';

@Module({
  imports: [
    ConfigsModule,
    ThrottlerModules,
    UserModule,
    ProductModule,
    DatabaseModule,
    CacheModules
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
