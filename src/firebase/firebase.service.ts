import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase.config';



@Injectable()
export class FirebaseService implements OnModuleInit {
  private firebaseApp: FirebaseApp;

  onModuleInit() {
    this.firebaseApp = initializeApp(firebaseConfig);
  }

  getFirebaseApp(): FirebaseApp {
    return this.firebaseApp;
  }
}
