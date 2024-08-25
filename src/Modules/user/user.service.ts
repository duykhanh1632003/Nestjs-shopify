import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SignInUserDto } from 'src/Dto/user.dto';
import { Role } from '../../enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      roles: createUserDto.roles || [Role.User], // Đảm bảo vai trò được thiết lập mặc định
    });
    return newUser.save();
  }

  async signIn(signInUserDto: SignInUserDto): Promise<{ user: UserDocument, access_token: string }> {
  const user = await this.userModel.findOne({ email: signInUserDto.email }).exec();

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(signInUserDto.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { username: user.username, sub: user._id, roles: user.roles };
  const access_token = "Bearer " + this.jwtService.sign(payload);
  return { user, access_token };
}

  async getDetailOfUser(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
