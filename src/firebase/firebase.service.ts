import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { configFirebase } from './confifFirebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential
} from 'firebase/auth';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firebaseApp: FirebaseApp;



  constructor(private configService: ConfigService) {
    const firebase: configFirebase = {
      apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: this.configService.get<string>('FIREBASE_MESSAGING_SENDER_ID'),
      appId: this.configService.get<string>('FIREBASE_APP_ID')
    }
    console.log('Firebase config:', this.configService.get('FIREBASE_API_KEY'));
    this.initializeFirebase(firebase);
  }

  onModuleInit() {
    // Implementation of interface method - can be empty if not needed
  }

  private initializeFirebase(config: configFirebase) {
    console.log(config);
    this.firebaseApp = initializeApp(config);
  }

  getFirebaseApp(): FirebaseApp {
    return this.firebaseApp;
  }

  async create(email: string, password: string): Promise<UserCredential> {
    try {
      const auth = getAuth(this.firebaseApp);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      const auth = getAuth(this.firebaseApp);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }
}
