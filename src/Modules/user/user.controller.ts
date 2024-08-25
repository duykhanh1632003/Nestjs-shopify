import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignInUserDto } from '../../Dto/user.dto';
import { errorResponse, successResponse } from '../../utils/response.util';
import { IUser, IUSerPreview } from 'src/interface/user.interface';
import { UserDocument } from '../database/schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private filterUser(user: UserDocument): IUSerPreview {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      username: user.username,
      phone: user.phone,
    };
  }

  @Get()
  checkHealth(): { message: string } {
    return successResponse('The application is running smoothly.');
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.userService.signUp(createUserDto);
      const filteredUser = this.filterUser(user);
      return successResponse('User signed up successfully', filteredUser);
    } catch (error) {
      return errorResponse('Failed to sign up user', error.message);
    }
  }

  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<any> {
    try {
      const result = await this.userService.signIn(signInUserDto);
      const filteredUser = this.filterUser(result.user);
      return successResponse('User signed in successfully', { user: filteredUser, access_token: result.access_token });
    } catch (error) {
      return errorResponse('Invalid credentials', error.message);
    }
  }

  @Get(':id')
  async getDetailOfUser(@Param('id') id: string): Promise<any> {
    try {
      const user = await this.userService.getDetailOfUser(id);
      const filteredUser = this.filterUser(user);
      return successResponse('User details retrieved successfully', filteredUser);
    } catch (error) {
      return errorResponse('User not found', error.message);
    }
  }
}
