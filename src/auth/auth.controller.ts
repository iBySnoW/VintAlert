import {
  Controller,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './AuthMetadata';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
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
  @ApiBody({type : LoginDto})
  @ApiResponse({ status: 200, description: 'Connexion réussie' })
  @Public()
  @Post('login')
  method(@Body() query: LoginDto) {
    return this.fireService.signIn(query.email, query.password);
  }

  @ApiOperation({ summary: 'Inscription utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Inscription réussie' })
  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.fireService.create(createUserDto.email, createUserDto.password);
  }
}
