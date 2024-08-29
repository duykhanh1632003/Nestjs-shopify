import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

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
    PassportModule.register({ session: true }),
    UserModule
  ],
    providers: [AuthService,LocalStrategy],

  exports: [JwtModule,AuthService], // Export JwtModule để có thể sử dụng trong các module khác
})
export class AuthModule {}
