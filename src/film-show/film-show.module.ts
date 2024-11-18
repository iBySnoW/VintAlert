import { Module } from '@nestjs/common';
import { FilmShowController } from './film-show.controller';
import { FilmShowService } from './film-show.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [FilmShowController],
  providers: [FilmShowService, FirebaseService],
  exports: [FilmShowService],
})
export class FilmShowModule {}
