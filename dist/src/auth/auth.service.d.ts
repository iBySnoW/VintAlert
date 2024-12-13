import { JwtService } from '@nestjs/jwt';
export declare class Auth {
    access_token: string;
}
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
}
