import { FirebaseService } from '../firebase/firebase.service';
import { RoomsService } from '../rooms/rooms.service';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FilmShowService } from '../film-show/film-show.service';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingsService {
    private readonly firebaseService;
    private readonly roomsService;
    private filmShowService;
    private db;
    constructor(firebaseService: FirebaseService, roomsService: RoomsService, filmShowService: FilmShowService);
    createBooking(createBookingDto: CreateBookingDto): Promise<string>;
    getAllBookings(): Promise<any[]>;
    getBookingsByUser(userId: string): Promise<any[]>;
    getBookingsByFilmShow(filmShowId: number): Promise<any[]>;
    getBookingById(bookingId: string): Promise<Booking>;
    updateBooking(bookingId: string, updatedData: UpdateBookingDto): Promise<{
        updatedAt: string;
        filmShowId: string;
        numberOfSeats: number;
        id: string;
        user: import("../users/user.entity").User;
        message: string;
    }>;
    deleteBooking(bookingId: string): Promise<{
        message: string;
    }>;
    getBookingsByRoom(roomId: string): Promise<Booking[]>;
}
