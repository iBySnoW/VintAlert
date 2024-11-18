import { Injectable, BadRequestException } from '@nestjs/common';
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
  where,
} from 'firebase/firestore';
import { FilmShow } from './film-show.entity';

@Injectable()
export class FilmShowService {
  private db;

  constructor(private firebaseService: FirebaseService) {
    this.db = getFirestore(this.firebaseService.getFirebaseApp());
  }

  async createFilmShow(filmShow: FilmShow) {
    // Vérifier la disponibilité de la salle
    const isAvailable = await this.checkRoomAvailability(
      filmShow.room.id,
      filmShow.startDate,
      filmShow.endDate
    );

    if (!isAvailable) {
      throw new BadRequestException(
        'La salle est déjà occupée pour cette période.'
      );
    }

    const filmShowRef = collection(this.db, 'filmShows');
    const docRef = await addDoc(filmShowRef, filmShow);
    return docRef.id;
  }

  async getAllFilmShows() {
    const filmShows = await query(collection(this.db, 'filmShows'));
    const filmShowDocs = await getDocs(filmShows);
    const filmShowsList = [];
    
    filmShowDocs.forEach((doc) => {
      filmShowsList.push({ id: doc.id, ...doc.data() });
    });
    
    return filmShowsList;
  }

  async getFilmShowById(filmShowId: string) : Promise<any> {
    const filmShowRef = doc(this.db, 'filmShows', filmShowId);
    const filmShowDoc = await getDoc(filmShowRef);
    
    if (!filmShowDoc.exists()) {
      throw new BadRequestException('Séance de film non trouvée');
    }
    
    return { id : filmShowDoc.id, ...filmShowDoc.data() };
  }

  async getFilmShowsByRoom(roomId: number) {
    const filmShowsQuery = query(
      collection(this.db, 'filmShows'),
      where('room.id', '==', roomId)
    );
    const filmShowDocs = await getDocs(filmShowsQuery);
    const roomFilmShows = []; 
    
    filmShowDocs.forEach((doc) => {
      roomFilmShows.push({ id: doc.id });
    });
    
    return roomFilmShows;
  }

  async updateFilmShow(filmShowId: string, updatedData: Partial<FilmShow>) {
    // Si les dates ou la salle sont modifiées, vérifier la disponibilité
    if (updatedData.startDate || updatedData.endDate || updatedData.room) {
      const currentFilmShow = await this.getFilmShowById(filmShowId);
      const isAvailable = await this.checkRoomAvailability(
        updatedData.room?.id || currentFilmShow.room.id,
        updatedData.startDate || currentFilmShow.startDate,
        updatedData.endDate || currentFilmShow.endDate,
        filmShowId
      );

      if (!isAvailable) {
        throw new BadRequestException(
          'La salle est déjà occupée pour cette période.'
        );
      }
    }

    const filmShowRef = doc(this.db, 'filmShows', filmShowId);
    await updateDoc(filmShowRef, updatedData);
    return { message: 'Séance de film mise à jour avec succès.' };
  }

  async deleteFilmShow(filmShowId: string) {
    const filmShowRef = doc(this.db, 'filmShows', filmShowId);
    await deleteDoc(filmShowRef);
    return { message: 'Séance de film supprimée avec succès.' };
  }

  private async checkRoomAvailability(
    roomId: number,
    startDate: Date,
    endDate: Date,
    excludeFilmShowId?: string
  ) {
    const filmShowsQuery = query(collection(this.db, 'filmShows'));
    const filmShows = await getDocs(filmShowsQuery);
    let isAvailable = true;

    filmShows.forEach((doc) => {
      if (excludeFilmShowId && doc.id === excludeFilmShowId) {
        return; // Ignorer la séance en cours de modification
      }

      const filmShow = doc.data() as FilmShow;
      const showStart = new Date(filmShow.startDate);
      const showEnd = new Date(filmShow.endDate);

      if (
        filmShow.room.id === roomId &&
        ((startDate >= showStart && startDate < showEnd) ||
          (endDate > showStart && endDate <= showEnd) ||
          (startDate <= showStart && endDate >= showEnd))
      ) {
        isAvailable = false;
      }
    });



    return isAvailable;
  }
}