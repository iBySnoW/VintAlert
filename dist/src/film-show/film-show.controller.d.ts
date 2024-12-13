import { FilmShowService } from './film-show.service';
import { CreateFilmShowDto } from './dto/create-film-show.dto';
import { UpdateFilmShowDto } from './dto/update-film-show.dto';
export declare class FilmShowController {
    private readonly filmShowService;
    constructor(filmShowService: FilmShowService);
    createFilmShow(createFilmShowDto: CreateFilmShowDto): Promise<{
        message: string;
        id: string;
    }>;
    getAllFilmShows(): Promise<any[]>;
    getFilmShowById(id: string): Promise<any>;
    getFilmShowsByRoom(roomId: number): Promise<any[]>;
    updateFilmShow(id: string, updatedData: UpdateFilmShowDto): Promise<{
        message: string;
    }>;
    deleteFilmShow(id: string): Promise<{
        message: string;
    }>;
}
