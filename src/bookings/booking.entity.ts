// src/modules/bookings/booking.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Room } from '../rooms/rooms.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Room)
    @JoinColumn()
    room: Room;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
}
