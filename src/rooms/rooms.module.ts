import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.service';
import { RoomController } from './rooms.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Room } from './rooms.entity';

@Module({
  providers: [RoomsService,FirebaseService],
  controllers: [RoomController],
})
export class RoomsModule {}
