import { Module } from '@nestjs/common';
import { FilmShowController } from './film-show.controller';
import { FilmShowService } from './film-show.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { MoviesService } from 'src/movies/movies.service';

@Module({
  controllers: [FilmShowController],
  providers: [FilmShowService, FirebaseService, MoviesService],
  exports: [FilmShowService],
})
export class FilmShowModule {}
