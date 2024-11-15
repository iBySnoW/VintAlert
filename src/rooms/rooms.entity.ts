// src/modules/rooms/room.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @Column({ nullable: true })
    description: string;

    @Column("json", { nullable: true })
    equipment: string[];

    @Column()
    location: string;
}
