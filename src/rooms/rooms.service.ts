// src/modules/rooms/room.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

@Injectable()
export class RoomsService {
  private db;

  constructor(private firebaseService: FirebaseService) {
    this.db = getFirestore(this.firebaseService.getFirebaseApp());
    console.log(this.db);
  }

  async createRoom(roomData: any) {
    console.log("createROOM");
    try {
      const roomsRef = collection(this.db, 'rooms');
      const docRef = await addDoc(roomsRef, roomData);
      return docRef.id;
    } catch (error) {
      throw new Error(`Error creating room: ${error}`);
    }
  }

  async getAllRooms() {
    try {
      const roomsRef = collection(this.db, 'rooms');
      const snapshot = await getDocs(roomsRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Error fetching rooms: ${error}`);
    }
  }

  async getRoomById(id: string) {
    try {
      const roomRef = doc(this.db, 'rooms', id);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        return { id: roomSnap.id, ...roomSnap.data() };
      } else {
        throw new Error('Room not found');
      }
    } catch (error) {
      throw new Error(`Error fetching room: ${error}`);
    }
  }

  async getRoomCapacity(id: string) {
    try {
      const roomRef = doc(this.db, 'rooms', id);
      const roomSnap = await getDoc(roomRef);
      
      if (!roomSnap.exists()) {
        throw new Error('Room not found');
      }
      
      const roomData = roomSnap.data();
      return { capacity: roomData.capacity };
    } catch (error) {
      throw new Error(`Error fetching room capacity: ${error}`);
    }
  }

  async updateRoom(id: string, roomData: any) {
    try {
      const roomRef = doc(this.db, 'rooms', id);
      await updateDoc(roomRef, roomData);
      return { id, ...roomData };
    } catch (error) {
      throw new Error(`Error updating room: ${error}`);
    }
  }

  async deleteRoom(id: string) {
    try {
      const roomRef = doc(this.db, 'rooms', id);
      await deleteDoc(roomRef);
      return { id };
    } catch (error) {
      throw new Error(`Error deleting room: ${error}`);
    }
  }

  async checkRoomCapacity(roomId: string, filmShowId: string) {
    try {
      // 1. Obtenir la capacité de la salle
      const roomCapacity = await this.getRoomCapacity(roomId);
      
      // 2. Compter le nombre de réservations existantes pour cette séance
      const bookingsRef = collection(this.db, 'bookings');
      const bookingsQuery = query(
        bookingsRef,
        where('filmShowId', '==', filmShowId)
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const currentBookings = bookingsSnapshot.size;

      // 3. Calculer les places restantes
      const remainingSeats = roomCapacity.capacity - currentBookings;

      return {
        isAvailable: remainingSeats > 0,
        maxCapacity: roomCapacity.capacity,
        currentBookings,
        remainingSeats
      };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la vérification de la capacité: ${error.message}`
      );
    }
  }
}
