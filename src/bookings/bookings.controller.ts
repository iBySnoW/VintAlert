import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity'
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('bookings')
export class BookingsController {

    constructor(private readonly bookingsService: BookingsService ) {}

    @UseGuards(AuthGuard)
    @Post()
    async createBooking(@Body() bookingsService: Booking){
        return this.bookingsService.createBooking(bookingsService);
    }

    @UseGuards(AuthGuard)
    @Get()
    async getBookings(){
        return this.bookingsService.getAllBookings();
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async getBookingsByRoom(@Param('id') id: string): Promise<Booking[]> {
        return this.bookingsService.getBookingsByRoom(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updateBooking(
        @Param('id') bookingId: string,
        @Body() updatedData: Partial<Booking>,
    ) {
        return this.bookingsService.updateBooking(bookingId, updatedData);
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteBooking(@Param('id') bookingId: string) {
        await this.bookingsService.deleteBooking(bookingId); // Appel de la méthode de suppression
        return { message: 'Réservation supprimée avec succès.' }; // Message de confirmation
    }
}
