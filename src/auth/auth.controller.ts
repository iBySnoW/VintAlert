import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, Auth } from './auth.service';
import { Public } from './AuthMetadata';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { User } from 'firebase/auth';

export class LoginDto {
  email: string;
  password: string;
}

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private fireService: FirebaseService,
  ) {}

  @Public()
  @Get('auth/login')
  method(@Query() query: LoginDto) { 
    // 1. Simple console.log
    console.log('Name parameter:', query);
    return this.fireService.signIn(query.email, query.password);

}

  @Get('auth/register')
  @Public()
  async register(@Query() createUserDto: CreateUserDto) {
    const user = await this.fireService.create(createUserDto.email,createUserDto.password );
    return user;
  }
}
