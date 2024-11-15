import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty()
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}


}
