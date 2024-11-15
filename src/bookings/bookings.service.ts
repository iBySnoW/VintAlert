import { Injectable,BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Booking } from './booking.entity';

@Injectable()
export class BookingsService {
  private db;
  private isconflict;
  constructor(private firebaseService: FirebaseService) {
    this.db = getFirestore(this.firebaseService.getFirebaseApp());
  }

  async createBooking(booking: Booking) {
    console.log('create', booking);
    // Vérification de la disponibilité de la salle
    const isAvailable = await this.checkAvailability(
        booking.room.id,
        booking.startDate,
        booking.endDate,
    );
    if (!isAvailable) {
      throw new BadRequestException(
        'La salle est déjà réservée pour cette période.',
      );
    }
    const bookingRef = collection(this.db, 'bookings');
    const docRef = await addDoc(bookingRef, booking);
    return docRef.id;
  }
  private async checkAvailability(roomId: number, startDate: Date, endDate: Date, bookingId?: number){
    const bookingRef = await query(collection(this.db,'bookings'));
    const bookings = await getDocs(bookingRef);
    let isAvailable = true; // Initialize availability as true

    // Vérifier les réservations qui se chevauchent
    bookings.forEach((doc) => {
        const booking = doc.data() as Booking;
        const bookingStart = booking.startDate; // Assurez-vous que startDate est un objet Date
        const bookingEnd = booking.endDate; // Assurez-vous que endDate est un objet Date
        if (booking.room.id === roomId && 
            ((startDate >= bookingStart && startDate < bookingEnd) || 
             (endDate > bookingStart && endDate <= bookingEnd) || 
             (startDate <= bookingStart && endDate >= bookingEnd))) {
            isAvailable = false; // Set to false if a conflict is found
        }
    });
    return isAvailable;

  }
  async getAllBookings(){
    const bookings = await query(collection(this.db,'bookings'));
    const bookingDocs = await getDocs(bookings);
    const Tabbookings = [];
    bookingDocs.forEach((doc) =>{
        Tabbookings.push(doc.data() as Booking); // Ajouter chaque réservation au tableau 
    });
    return Tabbookings
  }

  async getBookingsByRoom(bookingId: string){
    const bookingsQuery = await query(collection(this.db,'bookings'));
    const bookingDocs = await getDocs(bookingsQuery);
    const roomBookings = []; // Tableau pour stocker les réservations de la salle

    bookingDocs.forEach((doc) => {
        const booking = doc.data() as Booking; // Récupérer les données de réservation
        if (doc.id === bookingId) { // Vérifier si l'ID de la salle correspond
            roomBookings.push(booking); // Ajouter la réservation au tableau
        }
    });
    return roomBookings;
  }

  async updateBooking(bookingId: string, updatedData: Partial<Booking>) {
    const bookingRef = doc(this.db, 'bookings', bookingId); // Référence au document de réservation
    await updateDoc(bookingRef, updatedData); // Mettre à jour les données de réservation
    return { message: 'Réservation mise à jour avec succès.' }; // Message de confirmation
  }

  async deleteBooking(bookingId: string){
    const bookingRef = doc(this.db, 'bookings', bookingId); // Référence au document de réservation
    await deleteDoc(bookingRef);
  }
}
