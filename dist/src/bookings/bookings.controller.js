"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const update_booking_dto_1 = require("./dto/update-booking.dto");
let BookingsController = class BookingsController {
    constructor(bookingsService) {
        this.bookingsService = bookingsService;
    }
    async createBooking(createBookingDto) {
        try {
            const result = await this.bookingsService.createBooking(createBookingDto);
            return {
                id: result,
                message: 'Réservation créée avec succès'
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la création de la réservation: ${error.message}`);
        }
    }
    async getBookings() {
        return this.bookingsService.getAllBookings();
    }
    async getBookingsByRoom(id) {
        return this.bookingsService.getBookingsByRoom(id);
    }
    async updateBooking(bookingId, updateBookingDto) {
        return this.bookingsService.updateBooking(bookingId, updateBookingDto);
    }
    async deleteBooking(bookingId) {
        await this.bookingsService.deleteBooking(bookingId);
        return { message: 'Réservation supprimée avec succès.' };
    }
};
exports.BookingsController = BookingsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Créer une réservation' }),
    (0, swagger_1.ApiBody)({
        type: create_booking_dto_1.CreateBookingDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Réservation créée avec succès',
        schema: {
            example: {
                id: "booking123",
                message: "Réservation créée avec succès"
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides ou séance complète' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "createBooking", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les réservations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des réservations', type: [create_booking_dto_1.CreateBookingDto] }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getBookings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les réservations par salle' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la salle' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Réservations trouvées' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getBookingsByRoom", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une réservation' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la réservation' }),
    (0, swagger_1.ApiBody)({ type: update_booking_dto_1.UpdateBookingDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Réservation mise à jour' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booking_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "updateBooking", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une réservation' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la réservation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Réservation supprimée' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "deleteBooking", null);
exports.BookingsController = BookingsController = __decorate([
    (0, swagger_1.ApiTags)('bookings'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('bookings'),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingsController);
//# sourceMappingURL=bookings.controller.js.map