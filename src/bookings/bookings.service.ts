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
import { CreateBookingDto } from './dto/create-booking.dto';
import { FilmShowService } from '../film-show/film-show.service';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  private db;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly roomsService: RoomsService,
    private filmShowService: FilmShowService
  ) {
    this.db = getFirestore(this.firebaseService.getFirebaseApp());
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<string> {
    // Vérifier si la séance existe
    const filmShow = await this.filmShowService.getFilmShowById(createBookingDto.filmShowId);
    if (!filmShow) {
      throw new BadRequestException('Séance non trouvée');
    }

    // Vérifier le nombre de places déjà réservées pour cette séance
    const bookingsQuery = query(
      collection(this.db, 'bookings'),
      where('filmShowId', '==', createBookingDto.filmShowId)
    );
    const bookingsDocs = await getDocs(bookingsQuery);
    
    let totalReservedSeats = 0;
    bookingsDocs.forEach(doc => {
      const booking = doc.data();
      totalReservedSeats += booking.numberOfSeats;
    });

    // Vérifier si assez de places disponibles
    if (totalReservedSeats + createBookingDto.numberOfSeats > filmShow.room.capacity) {
      throw new BadRequestException('Plus assez de places disponibles');
    }

    // Créer la réservation
    const bookingRef = await addDoc(collection(this.db, 'bookings'), {
      ...createBookingDto,
      createdAt: new Date().toISOString()
    });

    return bookingRef.id;
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

  async updateBooking(bookingId: string, updatedData: UpdateBookingDto) {
    try {
      // Récupérer la réservation existante
      const currentBooking = await this.getBookingById(bookingId);
      if (!currentBooking) {
        throw new BadRequestException('Réservation non trouvée');
      }

      // Si le nombre de places ou la séance change, vérifier la capacité
      if (updatedData.numberOfSeats || updatedData.filmShowId) {
        const filmShowId = updatedData.filmShowId || currentBooking.filmShowId;
        const filmShow = await this.filmShowService.getFilmShowById(filmShowId);
        
        if (!filmShow) {
          throw new BadRequestException('Séance non trouvée');
        }

        // Calculer le nombre total de places réservées pour cette séance
        const bookingsQuery = query(
          collection(this.db, 'bookings'),
          where('filmShowId', '==', filmShowId)
        );
        const bookingsDocs = await getDocs(bookingsQuery);
        
        let totalReservedSeats = 0;
        bookingsDocs.forEach(doc => {
          const booking = doc.data();
          // Ne pas compter les places de la réservation en cours de modification
          if (doc.id !== bookingId) {
            totalReservedSeats += booking.numberOfSeats;
          }
        });

        // Ajouter le nouveau nombre de places demandé
        const newNumberOfSeats = updatedData.numberOfSeats || currentBooking.numberOfSeats;
        
        // Vérifier si la capacité est dépassée
        if (totalReservedSeats + newNumberOfSeats > filmShow.room.capacity) {
          throw new BadRequestException(
            `La capacité de la salle serait dépassée. Capacité: ${filmShow.room.capacity}, ` +
            `Places déjà réservées: ${totalReservedSeats}, Places demandées: ${newNumberOfSeats}`
          );
        }
      }

      // Mettre à jour la réservation
      const bookingRef = doc(this.db, 'bookings', bookingId);
      const updateData = {
        ...updatedData,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(bookingRef, updateData);

      return {
        message: 'Réservation mise à jour avec succès',
        id: bookingId,
        ...currentBooking,
        ...updateData
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
