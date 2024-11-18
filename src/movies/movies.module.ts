import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { FirebaseService } from 'src/firebase/firebase.service';
@Module({
  controllers: [MoviesController],
  providers: [MoviesService,FirebaseService]
})
export class MoviesModule {}
