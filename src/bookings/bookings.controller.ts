import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Public } from '../auth/AuthMetadata';
import { Booking } from './booking.entity'
@Controller('bookings')
export class BookingsController {

    constructor(private readonly bookingsService: BookingsService ) {}

    @Public()
    @Post()
    async createBooking(@Body() bookingsService: Booking){
        return this.bookingsService.createBooking(bookingsService);
    }

    @Public()
    @Get()
    async getBookings(){
        return this.bookingsService.getAllBookings();
    }

    @Public()
    @Get('/:id')
    async getBookingsByRoom(@Param('id') id: string): Promise<Booking[]> {
        return this.bookingsService.getBookingsByRoom(id);
    }

    @Public()
    @Put(':id')
    async updateBooking(
        @Param('id') bookingId: string,
        @Body() updatedData: Partial<Booking>,
    ) {
        return this.bookingsService.updateBooking(bookingId, updatedData);
    }
    @Public()
    @Delete(':id')
    async deleteBooking(@Param('id') bookingId: string) {
        await this.bookingsService.deleteBooking(bookingId); // Appel de la méthode de suppression
        return { message: 'Réservation supprimée avec succès.' }; // Message de confirmation
    }
}
