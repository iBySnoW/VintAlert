import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe, UseGuards, BadRequestException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity'
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@ApiTags('bookings')
@ApiBearerAuth('JWT-auth')
@Controller('bookings')
export class BookingsController {

    constructor(private readonly bookingsService: BookingsService ) {}

    @ApiOperation({ summary: 'Créer une réservation' })
    @ApiBody({ 
        type: CreateBookingDto,
        description: 'Données de la réservation',
        examples: {
            example1: {
                value: {
                    filmShowId: "abc123",
                    userId: "user123",
                    numberOfSeats: 2
                }
            }
        }
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Réservation créée avec succès',
        schema: {
            example: {
                id: "booking123",
                message: "Réservation créée avec succès"
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Données invalides ou séance complète' })
    @UseGuards(AuthGuard)
    @Post()
    async createBooking(@Body() createBookingDto: CreateBookingDto) {
        try {
            const result = await this.bookingsService.createBooking(createBookingDto);
            return {
                id: result,
                message: 'Réservation créée avec succès'
            };
        } catch (error) {
            throw new BadRequestException(
                `Erreur lors de la création de la réservation: ${error.message}`
            );
        }
    }

    @ApiOperation({ summary: 'Récupérer toutes les réservations' })
    @ApiResponse({ status: 200, description: 'Liste des réservations', type: [CreateBookingDto] })
    @UseGuards(AuthGuard)
    @Get()
    async getBookings(){
        return this.bookingsService.getAllBookings();
    }

    @ApiOperation({ summary: 'Récupérer les réservations par salle' })
    @ApiParam({ name: 'id', description: 'ID de la salle' })
    @ApiResponse({ status: 200, description: 'Réservations trouvées' })
    @UseGuards(AuthGuard)
    @Get('/:id')
    async getBookingsByRoom(@Param('id') id: string): Promise<Booking[]> {
        return this.bookingsService.getBookingsByRoom(id);
    }

    @ApiOperation({ summary: 'Mettre à jour une réservation' })
    @ApiParam({ name: 'id', description: 'ID de la réservation' })
    @ApiBody({ type: UpdateBookingDto })
    @ApiResponse({ status: 200, description: 'Réservation mise à jour' })
    @UseGuards(AuthGuard)
    @Put(':id')
    async updateBooking(
        @Param('id') bookingId: string,
        @Body() updateBookingDto: UpdateBookingDto,
    ) {
        return this.bookingsService.updateBooking(bookingId, updateBookingDto);
    }
    @ApiOperation({ summary: 'Supprimer une réservation' })
    @ApiParam({ name: 'id', description: 'ID de la réservation' })
    @ApiResponse({ status: 200, description: 'Réservation supprimée' })
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteBooking(@Param('id') bookingId: string) {
        await this.bookingsService.deleteBooking(bookingId); // Appel de la méthode de suppression
        return { message: 'Réservation supprimée avec succès.' }; // Message de confirmation
    }
}
