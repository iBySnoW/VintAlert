import {
  Controller,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, Auth } from './auth.service';
import { Public } from './AuthMetadata';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { User } from 'firebase/auth';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private fireService: FirebaseService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @ApiTags('Auth')
  @ApiCreatedResponse({
    description: 'Login on app',
    type: Auth,
  })
  @Post('auth/login')
  async login(@Body() signInDto: Record<string, string>) {
    return this.fireService.signIn(signInDto.email, signInDto.password);
  }

  @Post('auth/register')
  @Public()
  @ApiTags('Auth')
  @ApiCreatedResponse({
    description: 'Register on app',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.fireService.create(createUserDto.email,createUserDto.password );
    return user;
  }
}
