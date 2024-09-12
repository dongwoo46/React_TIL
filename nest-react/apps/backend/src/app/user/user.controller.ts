import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoginUserDto, UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { username } = createUserDto;

    // 이미 해당 이메일로 가입된 유저가 있는지 확인
    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new HttpException(
        '동일한 사용자가 존재합니다.',
        HttpStatus.BAD_REQUEST
      );
    }
    // 새 유저 생성
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
