import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('keyJson'), // Access keyJson from configuration
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  exports: [JwtModule], // Export JwtModule để có thể sử dụng trong các module khác
})
export class AuthModule {}
