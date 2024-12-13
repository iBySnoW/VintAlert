import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    createBooking(createBookingDto: CreateBookingDto): Promise<{
        id: string;
        message: string;
    }>;
    getBookings(): Promise<any[]>;
    getBookingsByRoom(id: string): Promise<Booking[]>;
    updateBooking(bookingId: string, updateBookingDto: UpdateBookingDto): Promise<{
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
}
