import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    GetMovies(): Promise<any>;
    getMovieByID(id: number): Promise<{
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
    getMovieByIdFirebase(id: number): Promise<{
        id: string;
    }[]>;
    removeMovie(id: string): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
