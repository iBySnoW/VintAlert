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
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const AuthMetadata_1 = require("../auth/AuthMetadata");
const movies_service_1 = require("./movies.service");
const swagger_1 = require("@nestjs/swagger");
const movie_dto_1 = require("./dto/movie.dto");
let MoviesController = class MoviesController {
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    async GetMovies() {
        return this.moviesService.getCurrentMovies();
    }
    async getMovieByID(id) {
        return this.moviesService.addMovieById(id);
    }
    async getMoviesFromFirebase() {
        return this.moviesService.getMoviesFromFirebase();
    }
    async getMovieByIdFirebase(id) {
        return this.moviesService.getMoviesID(id);
    }
    async removeMovie(id) {
        return this.moviesService.removeMovie(id);
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les films actuels' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des films actuels', type: [movie_dto_1.MovieDto] }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "GetMovies", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Ajouter un film par son ID TMDB' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID TMDB du film' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Film ajouté avec succès', type: movie_dto_1.MovieDto }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Post)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovieByID", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les films sauvegardés' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des films sauvegardés' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Get)('/saved'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMoviesFromFirebase", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un film par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du film' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Film trouvé' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovieByIdFirebase", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un film' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du film' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Film supprimé' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "removeMovie", null);
exports.MoviesController = MoviesController = __decorate([
    (0, swagger_1.ApiTags)('movies'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map