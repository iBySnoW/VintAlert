import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { configFirebase } from './configFirebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  Auth
} from 'firebase/auth';
import { getFirestore, Firestore, addDoc, doc, getDoc , collection } from 'firebase/firestore';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firebaseApp: FirebaseApp;
  private auth: Auth;
  private firestore: Firestore;

  constructor(private configService: ConfigService) {
    console.log('Toutes les variables d\'environnement:', this.configService.get('FIREBASE_API_KEY'));
    
    const firebase: configFirebase = {
      apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: this.configService.get<string>('FIREBASE_MESSAGING_SENDER_ID'),
      appId: this.configService.get<string>('FIREBASE_APP_ID')
    }    
    console.log('initialize');
    this.initializeFirebase(firebase);
    this.firestore = getFirestore(this.firebaseApp);

  }

  onModuleInit() {
    // Implementation of interface method - can be empty if not needed
  }

  private initializeFirebase(config: configFirebase) {
    this.firebaseApp = initializeApp(config);
    this.auth = getAuth(this.firebaseApp);
  }

  getFirebaseApp(): FirebaseApp {
    return this.firebaseApp;
  }

  async create(email: string, password: string): Promise<UserCredential> {
    try {      
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<UserCredential> {
    console.log('État de firebaseApp avant signIn:', this.firebaseApp); // Vérifiez l'instance avant la connexion

      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
  }

  async createDocument(collectionName: string, data: any) {
    const docRef = await addDoc(collection(this.firestore, collectionName), data);
    return docRef.id;
  }

  async findOne(collection: string, id: string) {
    const docRef = doc(this.firestore, collection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }
}
