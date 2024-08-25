import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { CustomLogger } from './logger/custom-logger.service';
import helmet from 'helmet';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new CustomLogger('Bootstrap'); // Sử dụng CustomLogger

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;


  app.enableCors();
  app.useGlobalFilters(new AllExceptionFilter());
  app.use(helmet());  
  app.use(session({
    secret: 'ahwfawfjawfjafjaw',// Chuỗi bí mật để ký session ID cookie 
    resave: false,// Không lưu lại session nếu không có thay đổi
    saveUninitialized: false, // Không tạo session mới nếu không có dữ liệu
    cookie: {
        maxAge: 60000, // Thời gian sống của session (ms)
        secure: process.env.NODE_ENV === 'production', // Chỉ sử dụng HTTPS trong môi trường production
      },
  }))
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err.stack); // Sử dụng CustomLogger để log lỗi
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', reason as string); // Log lỗi không bắt được
  });

  await app.listen(port);
  logger.log(`Application running at ${port}`); // Log khi ứng dụng bắt đầu
}

bootstrap();
