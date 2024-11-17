import { Controller, Get,Query, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { Public } from '../auth/AuthMetadata'; // Assurez-vous d'avoir ce décorateur
import { MoviesService } from './movies.service';
@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}
    @Public()
    @Get()
    async GetMovies(){
        return this.moviesService.getCurrentMovies();
    }

    @Public()
    @Post('/:id')
    async getMovieByID(@Param('id') id: number){
        return this.moviesService.addMovieById(id);
    }

    @Public()
    @Get('/:id')
    async getMovieByIdFirebase(@Param('id') id: number){
        return this.moviesService.getMoviesID(id);
    }
}
