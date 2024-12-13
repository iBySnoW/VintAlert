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
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const firebase_service_1 = require("../firebase/firebase.service");
const firestore_1 = require("firebase/firestore");
let MoviesService = class MoviesService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTUxZjhhYTc0OTU5ZWMyYTIxMGE5MjU1MzE4MTRhNCIsIm5iZiI6MTczMTY2NDg4OS4xODM1NTc3LCJzdWIiOiI2NzM2NDcwOTQ4ZTlkMmNmMDFhODgwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Yx_CJGV5sOqcOQzE4OR1tgsIkrCBfPNC1gEK60-n760';
        this.apiUrl = 'https://api.themoviedb.org/3';
        this.db = (0, firestore_1.getFirestore)(this.firebaseService.getFirebaseApp());
    }
    async getCurrentMovies() {
        const response = await axios_1.default.get(`${this.apiUrl}/movie/now_playing`, {
            headers: { Authorization: "Bearer " + this.apiKey },
        });
        const simplifiedMovies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            duration: null,
            vote_average: movie.vote_average,
            poster_path: movie.poster_path,
        }));
        return simplifiedMovies;
    }
    async addMovieById(movieId) {
        const response = await axios_1.default.get(`${this.apiUrl}/movie/${movieId}`, {
            headers: { Authorization: "Bearer " + this.apiKey },
        });
        const movie = {
            id: response.data.id,
            title: response.data.title,
            duration: response.data.runtime,
            vote_average: response.data.vote_average,
            poster_path: response.data.poster_path,
        };
        const roomsRef = (0, firestore_1.collection)(this.db, 'movies');
        await (0, firestore_1.addDoc)(roomsRef, movie);
        return {
            message: "Film bien ajouté",
            movie
        };
    }
    async getMoviesFromFirebase() {
        const moviesRef = (0, firestore_1.collection)(this.db, 'movies');
        const moviesDocs = await (0, firestore_1.getDocs)(moviesRef);
        return moviesDocs.docs.map(doc => ({
            id_base: doc.id,
            ...doc.data()
        }));
    }
    async getMoviesID(movieId) {
        const moviesRef = (0, firestore_1.collection)(this.db, 'movies');
        const moviesDOC = await (0, firestore_1.getDocs)(moviesRef);
        return moviesDOC.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
    async removeMovie(firebaseId) {
        try {
            const movieRef = (0, firestore_1.doc)(this.db, 'movies', firebaseId);
            await (0, firestore_1.deleteDoc)(movieRef);
            return {
                success: true,
                message: "Film supprimé avec succès"
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Erreur lors de la suppression du film",
                error: error.message
            };
        }
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map