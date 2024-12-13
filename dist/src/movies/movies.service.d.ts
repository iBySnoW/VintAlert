import { FirebaseService } from '../firebase/firebase.service';
export declare class MoviesService {
    private firebaseService;
    private apiKey;
    private apiUrl;
    private db;
    constructor(firebaseService: FirebaseService);
    getCurrentMovies(): Promise<any>;
    addMovieById(movieId: number): Promise<{
        message: string;
        movie: {
            id: any;
            title: any;
            duration: any;
            vote_average: any;
            poster_path: any;
        };
    }>;
    getMoviesFromFirebase(): Promise<{
        id_base: string;
    }[]>;
    getMoviesID(movieId: number): Promise<{
        id: string;
    }[]>;
    removeMovie(firebaseId: string): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
