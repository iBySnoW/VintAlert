import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FirebaseService } from '../firebase/firebase.service';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';



@Injectable()
export class MoviesService {
    private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTUxZjhhYTc0OTU5ZWMyYTIxMGE5MjU1MzE4MTRhNCIsIm5iZiI6MTczMTY2NDg4OS4xODM1NTc3LCJzdWIiOiI2NzM2NDcwOTQ4ZTlkMmNmMDFhODgwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Yx_CJGV5sOqcOQzE4OR1tgsIkrCBfPNC1gEK60-n760';
    private apiUrl = 'https://api.themoviedb.org/3';
    private db;
    constructor(private firebaseService: FirebaseService){
        this.db = getFirestore(this.firebaseService.getFirebaseApp());
    }   

  async getCurrentMovies() {
    const response = await axios.get(`${this.apiUrl}/movie/now_playing`, {
      headers: { Authorization: "Bearer "+ this.apiKey },
    });
    const simplifiedMovies = response.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        // Note: La durée n'est pas fournie dans la réponse d'origine, vous devrez peut-être l'ajouter via une autre requête
        duration: null, // Placeholder pour la durée
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
    }));
    return simplifiedMovies;
  }
  async addMovieById(movieId: number) {
    console.log(`${this.apiUrl}/movie/${movieId}`);
    const response = await axios.get(`${this.apiUrl}/movie/${movieId}`, {
        headers: { Authorization: "Bearer " + this.apiKey },
    });
    const movie = {
        id: response.data.id,
        title: response.data.title,
        duration: response.data.runtime, // Récupération de la durée
        vote_average: response.data.vote_average,
        poster_path: response.data.poster_path,
    };
    const roomsRef = collection(this.db, 'movies');
    await addDoc(roomsRef, movie);
    return {
        message:"Film bien ajouté",
        movie
    }
  }

  async getMoviesID(movieId: number){
    const moviesRef = collection(this.db,'movies');
    const moviesDOC = await getDocs(moviesRef);
    return moviesDOC.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))
  }



}
