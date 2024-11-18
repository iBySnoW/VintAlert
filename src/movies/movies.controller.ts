import { Controller, Get,Query, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { Public } from '../auth/AuthMetadata'; // Assurez-vous d'avoir ce décorateur
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MovieDto } from './dto/movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}
    @ApiOperation({ summary: 'Récupérer les films actuels' })
    @ApiResponse({ status: 200, description: 'Liste des films actuels', type: [MovieDto] })
    @Public()
    @Get()
    async GetMovies(){
        return this.moviesService.getCurrentMovies();
    }

    @ApiOperation({ summary: 'Ajouter un film par son ID TMDB' })
    @ApiParam({ name: 'id', description: 'ID TMDB du film' })
    @ApiResponse({ status: 201, description: 'Film ajouté avec succès', type: MovieDto })
    @Public()
    @Post('/:id')
    async getMovieByID(@Param('id', ParseIntPipe) id: number){
        return this.moviesService.addMovieById(id);
    }

    @ApiOperation({ summary: 'Récupérer les films sauvegardés' })
    @ApiResponse({ status: 200, description: 'Liste des films sauvegardés' })
    @Public()
    @Get('/saved')
    async getMoviesFromFirebase(){
        return this.moviesService.getMoviesFromFirebase();
    }


    @ApiOperation({ summary: 'Récupérer un film par ID' })
    @ApiParam({ name: 'id', description: 'ID du film' })
    @ApiResponse({ status: 200, description: 'Film trouvé' })
    @Public()
    @Get('/:id')
    async getMovieByIdFirebase(@Param('id') id: number){
        return this.moviesService.getMoviesID(id);
    }

    @ApiOperation({ summary: 'Supprimer un film' })
    @ApiParam({ name: 'id', description: 'ID du film' })
    @ApiResponse({ status: 200, description: 'Film supprimé' })
    @Public()
    @Delete('/:id')
    async removeMovie(@Param('id') id:string){
        return this.moviesService.removeMovie(id)
    }
}
