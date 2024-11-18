import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { BookingsController } from './bookings.controller';
import { FirebaseService } from '../firebase/firebase.service';
import { MoviesService } from 'src/movies/movies.service';
import { FilmShowService } from 'src/film-show/film-show.service';

@Module({
  providers: [BookingsService, FirebaseService, RoomsService, MoviesService, FilmShowService],
  controllers: [BookingsController]
})
export class BookingsModule {}
