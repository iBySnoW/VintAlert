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
import { MoviesService } from '../movies/movies.service';
import { CreateFilmShowDto } from './dto/create-film-show.dto';

@Injectable()
export class FilmShowService {
  private db;

  constructor(
    private firebaseService: FirebaseService,
    private moviesService: MoviesService
  ) {
    this.db = getFirestore(this.firebaseService.getFirebaseApp());
  }

  async createFilmShow(filmShow: CreateFilmShowDto) {
    // Vérifier si le film existe et récupérer sa durée
    const movies = await this.moviesService.getMoviesFromFirebase();
    const movie : any = movies.find(m => m.id_base === filmShow.movieId);
    if (!movie) {
      throw new BadRequestException('Film non trouvé');
    }

    // Calculer automatiquement l'endDate basée sur la durée du film
    const startDate = new Date(filmShow.startDate);
    const endDate = new Date(startDate.getTime() + (movie.duration * 60 * 1000));
    filmShow.endDate = endDate;

    // Vérifier la disponibilité de la salle
    const isAvailable = await this.checkRoomAvailability(
      filmShow.roomId,
      startDate,
      endDate
    );

    if (!isAvailable) {
      throw new BadRequestException('La salle est déjà occupée pour cette période.');
    }

    const filmShowRef = collection(this.db, 'filmShows');
    const docRef = await addDoc(filmShowRef, {
      ...filmShow,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
    return docRef.id;
  }

  async getAllFilmShows() {
    const filmShows = await query(collection(this.db, 'filmShows'));
    const filmShowDocs = await getDocs(filmShows);
    const movies = await this.moviesService.getMoviesFromFirebase();
    
    const filmShowsList = [];
    
    filmShowDocs.forEach((doc) => {
      const data = doc.data();
      const movie = movies.find(m => m.id_base === data.movieId);
      filmShowsList.push({
        id: doc.id,
        ...data,
        movie: movie || null
      });
    });
    
    return filmShowsList;
  }

  async getFilmShowById(filmShowId: string): Promise<any> {
    const filmShowRef = doc(this.db, 'filmShows', filmShowId);
    const filmShowDoc = await getDoc(filmShowRef);
    
    if (!filmShowDoc.exists()) {
      throw new BadRequestException('Séance de film non trouvée');
    }

    const filmShowData = filmShowDoc.data();
    // Récupérer les informations du film
    const movies = await this.moviesService.getMoviesFromFirebase();
    const movie = movies.find(m => m.id_base === filmShowData.movieId);
    
    return {
      id: filmShowDoc.id,
      ...filmShowData,
      movie: movie || null
    };
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
    const currentFilmShow = await this.getFilmShowById(filmShowId);
    
    // Si le film est modifié, recalculer l'endDate
    if (updatedData.movieId) {
      const movies = await this.moviesService.getMoviesFromFirebase();
      const movie : any = movies.find(m => m.id_base === updatedData.movieId);
      if (!movie) {
        throw new BadRequestException('Film non trouvé');
      }
      
      const startDate = updatedData.startDate ? new Date(updatedData.startDate) : new Date(currentFilmShow.startDate);
      updatedData.endDate = new Date(startDate.getTime() + (movie.duration * 60 * 1000));
    }

    // Vérifier la disponibilité de la salle
    if (updatedData.startDate || updatedData.endDate || updatedData.roomId) {
      const isAvailable = await this.checkRoomAvailability(
        updatedData.roomId || currentFilmShow.roomId,
        updatedData.startDate ? new Date(updatedData.startDate) : new Date(currentFilmShow.startDate),
        updatedData.endDate ? new Date(updatedData.endDate) : new Date(currentFilmShow.endDate),
        filmShowId
      );

      if (!isAvailable) {
        throw new BadRequestException('La salle est déjà occupée pour cette période.');
      }
    }

    const filmShowRef = doc(this.db, 'filmShows', filmShowId);
    await updateDoc(filmShowRef, {
      ...updatedData,
      startDate: updatedData.startDate ? new Date(updatedData.startDate).toISOString() : undefined,
      endDate: updatedData.endDate ? new Date(updatedData.endDate).toISOString() : undefined
    });
    
    return { message: 'Séance de film mise à jour avec succès.' };
  }

  async deleteFilmShow(filmShowId: string) {
    const filmShowRef = doc(this.db, 'filmShows', filmShowId);
    await deleteDoc(filmShowRef);
    return { message: 'Séance de film supprimée avec succès.' };
  }

  private async checkRoomAvailability(
    roomId: string,
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
        filmShow.roomId === roomId &&
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