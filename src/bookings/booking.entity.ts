// src/modules/bookings/booking.entity.ts
import { User } from '../users/user.entity';
import { FilmShow } from 'src/film-show/film-show.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Booking {
    id: string;
    user: User;
    filmShowId: string;
    @ApiProperty({ description: 'Nombre de places réservées', example: 2 })
    numberOfSeats: number;
}
