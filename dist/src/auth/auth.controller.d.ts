import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private authService;
    private fireService;
    constructor(authService: AuthService, fireService: FirebaseService);
    method(query: LoginDto): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<import("@firebase/auth").UserCredential>;
}
