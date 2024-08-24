import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignInUserDto } from 'src/Dto/user.dto';
import { User } from '../database/schema/user.schema';
import { AuthGuard } from 'src/Middleware/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
    checkHealth() {
        return { status: 'Ok' , message : 'The application is running smoothly.'}
  }
  
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<{ user: User, access_token: string }> {
    return this.userService.signIn(signInUserDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getDetailOfUser(@Param('id') id: string) {
    return this.userService.getDetailOfUser(id);
  }
}
