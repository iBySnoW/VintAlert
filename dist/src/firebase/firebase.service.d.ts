import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp } from 'firebase/app';
import { UserCredential } from 'firebase/auth';
import { JwtService } from '@nestjs/jwt';
export declare class FirebaseService implements OnModuleInit {
    private configService;
    private jwtService;
    private firebaseApp;
    private adminApp;
    private auth;
    private firestore;
    private adminAuth;
    constructor(configService: ConfigService, jwtService: JwtService);
    onModuleInit(): void;
    getFirebaseApp(): FirebaseApp;
    private initializeFirebase;
    removeUser(userId: string): Promise<{
        message: string;
    }>;
    create(email: string, password: string): Promise<UserCredential>;
    signIn(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
