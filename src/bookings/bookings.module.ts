import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  providers: [BookingsService,FirebaseService],
  controllers: [BookingsController]
})
export class BookingsModule {}
