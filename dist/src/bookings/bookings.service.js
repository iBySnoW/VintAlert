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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const rooms_service_1 = require("../rooms/rooms.service");
const firestore_1 = require("firebase/firestore");
const film_show_service_1 = require("../film-show/film-show.service");
let BookingsService = class BookingsService {
    constructor(firebaseService, roomsService, filmShowService) {
        this.firebaseService = firebaseService;
        this.roomsService = roomsService;
        this.filmShowService = filmShowService;
        this.db = (0, firestore_1.getFirestore)(this.firebaseService.getFirebaseApp());
    }
    async createBooking(createBookingDto) {
        const filmShow = await this.filmShowService.getFilmShowById(createBookingDto.filmShowId);
        if (!filmShow) {
            throw new common_1.BadRequestException('Séance non trouvée');
        }
        const bookingsQuery = (0, firestore_1.query)((0, firestore_1.collection)(this.db, 'bookings'), (0, firestore_1.where)('filmShowId', '==', createBookingDto.filmShowId));
        const bookingsDocs = await (0, firestore_1.getDocs)(bookingsQuery);
        let totalReservedSeats = 0;
        bookingsDocs.forEach(doc => {
            const booking = doc.data();
            totalReservedSeats += booking.numberOfSeats;
        });
        if (totalReservedSeats + createBookingDto.numberOfSeats > filmShow.room.capacity) {
            throw new common_1.BadRequestException('Plus assez de places disponibles');
        }
        const bookingRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(this.db, 'bookings'), {
            ...createBookingDto,
            createdAt: new Date().toISOString()
        });
        return bookingRef.id;
    }
    async getAllBookings() {
        const bookings = await (0, firestore_1.query)((0, firestore_1.collection)(this.db, 'bookings'));
        const bookingDocs = await (0, firestore_1.getDocs)(bookings);
        const bookingsList = [];
        bookingDocs.forEach((doc) => {
            bookingsList.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return bookingsList;
    }
    async getBookingsByUser(userId) {
        const bookingsQuery = (0, firestore_1.query)((0, firestore_1.collection)(this.db, 'bookings'), (0, firestore_1.where)('userId', '==', userId));
        const bookingDocs = await (0, firestore_1.getDocs)(bookingsQuery);
        const userBookings = [];
        bookingDocs.forEach((doc) => {
            userBookings.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return userBookings;
    }
    async getBookingsByFilmShow(filmShowId) {
        const bookingsQuery = (0, firestore_1.query)((0, firestore_1.collection)(this.db, 'bookings'), (0, firestore_1.where)('filmShowId', '==', filmShowId));
        const bookingDocs = await (0, firestore_1.getDocs)(bookingsQuery);
        const filmShowBookings = [];
        bookingDocs.forEach((doc) => {
            filmShowBookings.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return filmShowBookings;
    }
    async getBookingById(bookingId) {
        const bookingRef = (0, firestore_1.doc)(this.db, 'bookings', bookingId);
        const bookingDoc = await (0, firestore_1.getDoc)(bookingRef);
        if (!bookingDoc.exists()) {
            throw new common_1.BadRequestException('Réservation non trouvée');
        }
        return {
            id: bookingDoc.id,
            ...bookingDoc.data(),
        };
    }
    async updateBooking(bookingId, updatedData) {
        try {
            const currentBooking = await this.getBookingById(bookingId);
            if (!currentBooking) {
                throw new common_1.BadRequestException('Réservation non trouvée');
            }
            if (updatedData.numberOfSeats || updatedData.filmShowId) {
                const filmShowId = updatedData.filmShowId || currentBooking.filmShowId;
                const filmShow = await this.filmShowService.getFilmShowById(filmShowId);
                if (!filmShow) {
                    throw new common_1.BadRequestException('Séance non trouvée');
                }
                const bookingsQuery = (0, firestore_1.query)((0, firestore_1.collection)(this.db, 'bookings'), (0, firestore_1.where)('filmShowId', '==', filmShowId));
                const bookingsDocs = await (0, firestore_1.getDocs)(bookingsQuery);
                let totalReservedSeats = 0;
                bookingsDocs.forEach(doc => {
                    const booking = doc.data();
                    if (doc.id !== bookingId) {
                        totalReservedSeats += booking.numberOfSeats;
                    }
                });
                const newNumberOfSeats = updatedData.numberOfSeats || currentBooking.numberOfSeats;
                if (totalReservedSeats + newNumberOfSeats > filmShow.room.capacity) {
                    throw new common_1.BadRequestException(`La capacité de la salle serait dépassée. Capacité: ${filmShow.room.capacity}, ` +
                        `Places déjà réservées: ${totalReservedSeats}, Places demandées: ${newNumberOfSeats}`);
                }
            }
            const bookingRef = (0, firestore_1.doc)(this.db, 'bookings', bookingId);
            const updateData = {
                ...updatedData,
                updatedAt: new Date().toISOString()
            };
            await (0, firestore_1.updateDoc)(bookingRef, updateData);
            return {
                message: 'Réservation mise à jour avec succès',
                id: bookingId,
                ...currentBooking,
                ...updateData
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la mise à jour de la réservation: ${error.message}`);
        }
    }
    async deleteBooking(bookingId) {
        try {
            const bookingRef = (0, firestore_1.doc)(this.db, 'bookings', bookingId);
            await (0, firestore_1.deleteDoc)(bookingRef);
            return { message: 'Réservation supprimée avec succès.' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la suppression de la réservation: ${error.message}`);
        }
    }
    async getBookingsByRoom(roomId) {
        try {
            const filmShowsQuery = (0, firestore_1.query)((0, firestore_1.collection)(this.db, 'filmShows'), (0, firestore_1.where)('room.id', '==', roomId));
            const filmShowsSnapshot = await (0, firestore_1.getDocs)(filmShowsQuery);
            const filmShowIds = filmShowsSnapshot.docs.map(doc => doc.id);
            if (filmShowIds.length === 0) {
                return [];
            }
            const bookingsQuery = (0, firestore_1.query)((0, firestore_1.collection)(this.db, 'bookings'), (0, firestore_1.where)('filmShowId', 'in', filmShowIds));
            const bookingsSnapshot = await (0, firestore_1.getDocs)(bookingsQuery);
            const bookings = bookingsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return bookings;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la récupération des réservations pour la salle: ${error.message}`);
        }
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        rooms_service_1.RoomsService,
        film_show_service_1.FilmShowService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map