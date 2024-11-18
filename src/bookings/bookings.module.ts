import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { BookingsController } from './bookings.controller';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  providers: [BookingsService, FirebaseService, RoomsService],
  controllers: [BookingsController]
})
export class BookingsModule {}
