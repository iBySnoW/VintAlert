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
exports.FilmShowService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const firestore_1 = require("firebase/firestore");
const movies_service_1 = require("../movies/movies.service");
let FilmShowService = class FilmShowService {
    constructor(firebaseService, moviesService) {
        this.firebaseService = firebaseService;
        this.moviesService = moviesService;
        this.db = (0, firestore_1.getFirestore)(this.firebaseService.getFirebaseApp());
    }
    async createFilmShow(filmShow) {
        const movies = await this.moviesService.getMoviesFromFirebase();
        const movie = movies.find(m => m.id_base === filmShow.movieId);
        if (!movie) {
            throw new common_1.BadRequestException('Film non trouvé');
        }
        const startDate = new Date(filmShow.startDate);
        const endDate = new Date(startDate.getTime() + (movie.duration * 60 * 1000));
        filmShow.endDate = endDate;
        const isAvailable = await this.checkRoomAvailability(filmShow.roomId, startDate, endDate);
        if (!isAvailable) {
            throw new common_1.BadRequestException('La salle est déjà occupée pour cette période.');
        }
        const filmShowRef = (0, firestore_1.collection)(this.db, 'filmShows');
        const docRef = await (0, firestore_1.addDoc)(filmShowRef, {
            ...filmShow,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        });
        return docRef.id;
    }
    async getAllFilmShows() {
        const filmShows = await (0, firestore_1.query)((0, firestore_1.collection)(this.db, 'filmShows'));
        const filmShowDocs = await (0, firestore_1.getDocs)(filmShows);
        const movies = await this.moviesService.getMoviesFromFirebase();
        const filmShowsList = [];
        filmShowDocs.forEach((doc) => {
            const data = doc.data();
            const movie = movies.find(m => m.id_base === data.movieId);
            filmShowsList.push({
                id: doc.id,
                ...data,
                movie: movie || null
            });
        });
        return filmShowsList;
    }
    async getFilmShowById(filmShowId) {
        const filmShowRef = (0, firestore_1.doc)(this.db, 'filmShows', filmShowId);
        const filmShowDoc = await (0, firestore_1.getDoc)(filmShowRef);
        if (!filmShowDoc.exists()) {
            throw new common_1.BadRequestException('Séance de film non trouvée');
        }
        const filmShowData = filmShowDoc.data();
        const movies = await this.moviesService.getMoviesFromFirebase();
        const movie = movies.find(m => m.id_base === filmShowData.movieId);
        return {
            id: filmShowDoc.id,
            ...filmShowData,
            movie: movie || null
        };
    }
    async getFilmShowsByRoom(roomId) {
        const filmShowsQuery = (0, firestore_1.query)((0, firestore_1.collection)(this.db, 'filmShows'), (0, firestore_1.where)('room.id', '==', roomId));
        const filmShowDocs = await (0, firestore_1.getDocs)(filmShowsQuery);
        const roomFilmShows = [];
        filmShowDocs.forEach((doc) => {
            roomFilmShows.push({ id: doc.id });
        });
        return roomFilmShows;
    }
    async updateFilmShow(filmShowId, updatedData) {
        const currentFilmShow = await this.getFilmShowById(filmShowId);
        if (updatedData.movieId) {
            const movies = await this.moviesService.getMoviesFromFirebase();
            const movie = movies.find(m => m.id_base === updatedData.movieId);
            if (!movie) {
                throw new common_1.BadRequestException('Film non trouvé');
            }
            const startDate = updatedData.startDate ? new Date(updatedData.startDate) : new Date(currentFilmShow.startDate);
            updatedData.endDate = new Date(startDate.getTime() + (movie.duration * 60 * 1000));
        }
        if (updatedData.startDate || updatedData.endDate || updatedData.roomId) {
            const isAvailable = await this.checkRoomAvailability(updatedData.roomId || currentFilmShow.roomId, updatedData.startDate ? new Date(updatedData.startDate) : new Date(currentFilmShow.startDate), updatedData.endDate ? new Date(updatedData.endDate) : new Date(currentFilmShow.endDate), filmShowId);
            if (!isAvailable) {
                throw new common_1.BadRequestException('La salle est déjà occupée pour cette période.');
            }
        }
        const filmShowRef = (0, firestore_1.doc)(this.db, 'filmShows', filmShowId);
        await (0, firestore_1.updateDoc)(filmShowRef, {
            ...updatedData,
            startDate: updatedData.startDate ? new Date(updatedData.startDate).toISOString() : undefined,
            endDate: updatedData.endDate ? new Date(updatedData.endDate).toISOString() : undefined
        });
        return { message: 'Séance de film mise à jour avec succès.' };
    }
    async deleteFilmShow(filmShowId) {
        const filmShowRef = (0, firestore_1.doc)(this.db, 'filmShows', filmShowId);
        await (0, firestore_1.deleteDoc)(filmShowRef);
        return { message: 'Séance de film supprimée avec succès.' };
    }
    async checkRoomAvailability(roomId, startDate, endDate, excludeFilmShowId) {
        const filmShowsQuery = (0, firestore_1.query)((0, firestore_1.collection)(this.db, 'filmShows'));
        const filmShows = await (0, firestore_1.getDocs)(filmShowsQuery);
        let isAvailable = true;
        filmShows.forEach((doc) => {
            if (excludeFilmShowId && doc.id === excludeFilmShowId) {
                return;
            }
            const filmShow = doc.data();
            const showStart = new Date(filmShow.startDate);
            const showEnd = new Date(filmShow.endDate);
            if (filmShow.roomId === roomId &&
                ((startDate >= showStart && startDate < showEnd) ||
                    (endDate > showStart && endDate <= showEnd) ||
                    (startDate <= showStart && endDate >= showEnd))) {
                isAvailable = false;
            }
        });
        return isAvailable;
    }
};
exports.FilmShowService = FilmShowService;
exports.FilmShowService = FilmShowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        movies_service_1.MoviesService])
], FilmShowService);
//# sourceMappingURL=film-show.service.js.map