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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';

export class LoginDto {
  email: string;
  password: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private fireService: FirebaseService,
  ) {}

  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiQuery({ name: 'email', required: true })
  @ApiQuery({ name: 'password', required: true })
  @ApiResponse({ status: 200, description: 'Connexion réussie' })
  @Public()
  @Get('login')
  method(@Query() query: LoginDto) {
    return this.fireService.signIn(query.email, query.password);
  }

  @ApiOperation({ summary: 'Inscription utilisateur' })
  @ApiQuery({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Inscription réussie' })
  @Public()
  @Get('register')
  async register(@Query() createUserDto: CreateUserDto) {
    return this.fireService.create(createUserDto.email, createUserDto.password);
  }
}
