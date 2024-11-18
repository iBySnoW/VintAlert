import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomController } from './rooms.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
@Module({

  providers: [RoomsService, FirebaseService],
  controllers: [RoomController]
})
export class RoomsModule {}
