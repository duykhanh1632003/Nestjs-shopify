import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../Auth/auth.module';
import { UsersModel } from '../database/model/user.model';

@Module({
  imports: [
    UsersModel,
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [ UserService]
})
export class UserModule {}
