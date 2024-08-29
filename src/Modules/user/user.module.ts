import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../Auth/auth.module';
import { UsersModel } from '../database/model/user.model';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UsersModel,
    AuthModule,
    ScheduleModule.forRoot()
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [ UserService, UserModule]
})
export class UserModule {}
