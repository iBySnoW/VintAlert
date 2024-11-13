import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';


@Injectable()
export class BookingsService {
    private db;

    constructor(private firebaseService: FirebaseService){
        this.db = getFirestore(this.firebaseService.getFirebaseApp());
    }

}
