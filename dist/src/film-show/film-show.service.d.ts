import { FirebaseService } from '../firebase/firebase.service';
import { FilmShow } from './film-show.entity';
import { MoviesService } from '../movies/movies.service';
import { CreateFilmShowDto } from './dto/create-film-show.dto';
export declare class FilmShowService {
    private firebaseService;
    private moviesService;
    private db;
    constructor(firebaseService: FirebaseService, moviesService: MoviesService);
    createFilmShow(filmShow: CreateFilmShowDto): Promise<string>;
    getAllFilmShows(): Promise<any[]>;
    getFilmShowById(filmShowId: string): Promise<any>;
    getFilmShowsByRoom(roomId: number): Promise<any[]>;
    updateFilmShow(filmShowId: string, updatedData: Partial<FilmShow>): Promise<{
        message: string;
    }>;
    deleteFilmShow(filmShowId: string): Promise<{
        message: string;
    }>;
    private checkRoomAvailability;
}
