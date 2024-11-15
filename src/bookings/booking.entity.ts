// src/modules/bookings/booking.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Room } from '../rooms/rooms.entity';

@Entity()
export class Booking {
    id: number;
    user: User;
    room: Room;
    startDate: Date;
    endDate: Date;
}
