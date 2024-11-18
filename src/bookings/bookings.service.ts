import { Injectable, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { RoomsService } from '../rooms/rooms.service';
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
  where,
} from 'firebase/firestore';
import { Booking } from './booking.entity';

@Injectable()
export class BookingsService {
  private db;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly roomsService: RoomsService
  ) {
    this.db = getFirestore(this.firebaseService.getFirebaseApp());
  }

  async createBooking(booking: Booking) {
    try {
      // Vérifier si la séance existe et n'est pas complète
      const capacityCheck = await this.roomsService.checkRoomCapacity(
        booking.filmShow.room.id.toString(),
        booking.filmShow.id.toString()
      );

      if (!capacityCheck.isAvailable) {
        throw new BadRequestException(
          `La séance est complète. Capacité maximale: ${capacityCheck.maxCapacity}, Places restantes: ${capacityCheck.remainingSeats}`
        );
      }

      const bookingRef = collection(this.db, 'bookings');
      const docRef = await addDoc(bookingRef, {
        userId: booking.user.id,
        filmShowId: booking.filmShow.id,
        createdAt: new Date(),
      });

      return {
        id: docRef.id,
        ...booking,
      };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la création de la réservation: ${error.message}`
      );
    }
  }

  async getAllBookings() {
    const bookings = await query(collection(this.db, 'bookings'));
    const bookingDocs = await getDocs(bookings);
    const bookingsList = [];

    bookingDocs.forEach((doc) => {
      bookingsList.push({
        id: doc.id,
        ...doc.data(),
      } as Booking);
    });

    return bookingsList;
  }

  async getBookingsByUser(userId: string) {
    const bookingsQuery = query(
      collection(this.db, 'bookings'),
      where('userId', '==', userId)
    );
    const bookingDocs = await getDocs(bookingsQuery);
    const userBookings = [];

    bookingDocs.forEach((doc) => {
      userBookings.push({
        id: doc.id,
        ...doc.data(),
      } as Booking);
    });

    return userBookings;
  }

  async getBookingsByFilmShow(filmShowId: number) {
    const bookingsQuery = query(
      collection(this.db, 'bookings'),
      where('filmShowId', '==', filmShowId)
    );
    const bookingDocs = await getDocs(bookingsQuery);
    const filmShowBookings = [];

    bookingDocs.forEach((doc) => {
      filmShowBookings.push({
        id: doc.id,
        ...doc.data(),
      } as Booking);
    });

    return filmShowBookings;
  }

  async getBookingById(bookingId: string) {
    const bookingRef = doc(this.db, 'bookings', bookingId);
    const bookingDoc = await getDoc(bookingRef);

    if (!bookingDoc.exists()) {
      throw new BadRequestException('Réservation non trouvée');
    }

    return {
      id: bookingDoc.id,
      ...bookingDoc.data(),
    } as Booking;
  }

  async updateBooking(bookingId: string, updatedData: Partial<Booking>) {
    try {
      if (updatedData.filmShow) {
        const capacityCheck = await this.roomsService.checkRoomCapacity(
          updatedData.filmShow.room.id.toString(),
          updatedData.filmShow.id.toString()
        );

        if (!capacityCheck.isAvailable) {
          throw new BadRequestException(
            `La nouvelle séance est complète. Capacité maximale: ${capacityCheck.maxCapacity}, Places restantes: ${capacityCheck.remainingSeats}`
          );
        }
      }

      const bookingRef = doc(this.db, 'bookings', bookingId);
      await updateDoc(bookingRef, {
        ...updatedData,
        updatedAt: new Date(),
      });

      return {
        message: 'Réservation mise à jour avec succès.',
        id: bookingId,
        ...updatedData,
      };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la mise à jour de la réservation: ${error.message}`
      );
    }
  }

  async deleteBooking(bookingId: string) {
    try {
      const bookingRef = doc(this.db, 'bookings', bookingId);
      await deleteDoc(bookingRef);
      return { message: 'Réservation supprimée avec succès.' };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la suppression de la réservation: ${error.message}`
      );
    }
  }

  async getBookingsByRoom(roomId: string): Promise<Booking[]> {
    try {
      // D'abord, récupérer toutes les séances pour cette salle
      const filmShowsQuery = query(
        collection(this.db, 'filmShows'),
        where('room.id', '==', roomId)
      );
      const filmShowsSnapshot = await getDocs(filmShowsQuery);
      
      // Récupérer les IDs des séances
      const filmShowIds = filmShowsSnapshot.docs.map(doc => doc.id);
      
      // Si aucune séance n'est trouvée, retourner un tableau vide
      if (filmShowIds.length === 0) {
        return [];
      }

      // Récupérer toutes les réservations pour ces séances
      const bookingsQuery = query(
        collection(this.db, 'bookings'),
        where('filmShowId', 'in', filmShowIds)
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);
      
      const bookings = bookingsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));

      return bookings;
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la récupération des réservations pour la salle: ${error.message}`
      );
    }
  }
}
