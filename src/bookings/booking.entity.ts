// src/modules/bookings/booking.entity.ts
import { User } from '../users/user.entity';
import { FilmShow } from 'src/film-show/film-show.entity';

export class Booking {
    id: string;
    user: User;
    filmShow: FilmShow;
}
