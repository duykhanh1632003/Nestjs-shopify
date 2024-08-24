import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SignInUserDto } from 'src/Dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async signIn(signInUserDto: SignInUserDto): Promise<{ user: User, access_token: string }> {
    const user = await this.userModel.findOne({ email: signInUserDto.email }).exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(signInUserDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user._id };
    const access_token ="Bear " + this.jwtService.sign(payload);
    return {
      user,
      access_token,
    };
  }

  async getDetailOfUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select("name username email");
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
