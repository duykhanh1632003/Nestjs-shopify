// prettier-ignore
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserDocument } from '../database/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(
        'User not found please check your email or sign up',
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('User name or password incorrect');
  }
}
