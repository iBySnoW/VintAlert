import { Injectable, OnModuleInit, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { configFirebase } from './configFirebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  Auth,
} from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';
import { json } from 'stream/consumers';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firebaseApp: FirebaseApp;
  private adminApp: admin.app.App;
  private auth: Auth;
  private firestore: Firestore;
  private adminAuth: admin.auth.Auth;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) {
    // Initialisation Firebase Client
    const firebase: configFirebase = {
      apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: this.configService.get<string>('FIREBASE_MESSAGING_SENDER_ID'),
      appId: this.configService.get<string>('FIREBASE_APP_ID')
    };    

    const adminCert : admin.ServiceAccount = {
      projectId: this.configService.get<string>('FIREBASE_ADMIN_project_id'),
      privateKey: this.configService.get<string>('FIREBASE_ADMIN_private_key').replace(/\\n/g, '\n'),
      clientEmail: this.configService.get<string>('FIREBASE_ADMIN_client_email')
    };

    // Initialisation Firebase Admin
    if (!admin.apps.length) {
      this.adminApp = admin.initializeApp({
        credential: admin.credential.cert(adminCert)
      });
    } else {
      this.adminApp = admin.app();
    }
    
    this.adminAuth = admin.auth(this.adminApp);
    this.initializeFirebase(firebase);
    this.firestore = getFirestore(this.firebaseApp);
  }

  onModuleInit() {
    
  }

  getFirebaseApp(): FirebaseApp {
    return this.firebaseApp;
  }

  private initializeFirebase(config: configFirebase) {
    this.firebaseApp = initializeApp(config);
    this.auth = getAuth(this.firebaseApp);
  }

  async removeUser(userId: string) {
    try {
      // Utiliser Admin SDK pour supprimer l'utilisateur
      await this.adminAuth.deleteUser(userId);
      return { message: 'Utilisateur supprimé avec succès' };
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        throw new NotFoundException('Utilisateur non trouvé');
      }
      throw new Error(`Erreur lors de la suppression de l'utilisateur: ${error.message}`);
    }
  }

  async create(email: string, password: string): Promise<UserCredential> {
    try {      
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    try {      
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);

      const payload = { sub: userCredential.user.providerId, username: userCredential.user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };

      
    } catch (error) {
        throw new UnauthorizedException("Identifiant de connexion invalide")  
    }
  }


  // ... autres méthodes existantes ...
}
