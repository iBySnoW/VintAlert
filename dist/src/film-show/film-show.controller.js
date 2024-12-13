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
exports.FilmShowController = void 0;
const common_1 = require("@nestjs/common");
const film_show_service_1 = require("./film-show.service");
const film_show_entity_1 = require("./film-show.entity");
const AuthMetadata_1 = require("../auth/AuthMetadata");
const swagger_1 = require("@nestjs/swagger");
const create_film_show_dto_1 = require("./dto/create-film-show.dto");
const update_film_show_dto_1 = require("./dto/update-film-show.dto");
let FilmShowController = class FilmShowController {
    constructor(filmShowService) {
        this.filmShowService = filmShowService;
    }
    async createFilmShow(createFilmShowDto) {
        try {
            createFilmShowDto.startDate = new Date(createFilmShowDto.startDate);
            const result = await this.filmShowService.createFilmShow(createFilmShowDto);
            return {
                message: 'Séance de film créée avec succès',
                id: result
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la création de la séance: ${error.message}`);
        }
    }
    async getAllFilmShows() {
        try {
            return await this.filmShowService.getAllFilmShows();
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la récupération des séances: ${error.message}`);
        }
    }
    async getFilmShowById(id) {
        try {
            return await this.filmShowService.getFilmShowById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la récupération de la séance: ${error.message}`);
        }
    }
    async getFilmShowsByRoom(roomId) {
        try {
            return await this.filmShowService.getFilmShowsByRoom(roomId);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la récupération des séances pour la salle: ${error.message}`);
        }
    }
    async updateFilmShow(id, updatedData) {
        try {
            if (updatedData.startDate) {
                updatedData.startDate = new Date(updatedData.startDate);
            }
            if (updatedData.endDate) {
                updatedData.endDate = new Date(updatedData.endDate);
            }
            if (updatedData.startDate && updatedData.endDate) {
                if (updatedData.endDate <= updatedData.startDate) {
                    throw new common_1.BadRequestException('La date de fin doit être postérieure à la date de début');
                }
            }
            return await this.filmShowService.updateFilmShow(id, updatedData);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la mise à jour de la séance: ${error.message}`);
        }
    }
    async deleteFilmShow(id) {
        try {
            return await this.filmShowService.deleteFilmShow(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la suppression de la séance: ${error.message}`);
        }
    }
};
exports.FilmShowController = FilmShowController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle séance de film' }),
    (0, swagger_1.ApiBody)({
        type: create_film_show_dto_1.CreateFilmShowDto,
        description: 'Données de la séance à créer',
        examples: {
            example1: {
                value: {
                    roomId: "salle-1",
                    movieId: "Tbv1IhN4xvX7sV75UeLb",
                    startDate: "2024-03-20T14:30:00.000Z"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Séance créée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides ou salle non disponible' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_film_show_dto_1.CreateFilmShowDto]),
    __metadata("design:returntype", Promise)
], FilmShowController.prototype, "createFilmShow", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les séances' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des séances avec les détails des films',
        type: [create_film_show_dto_1.CreateFilmShowDto]
    }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilmShowController.prototype, "getAllFilmShows", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une séance par son ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la séance' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Séance trouvée avec les détails du film',
        type: film_show_entity_1.FilmShow
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Séance non trouvée' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilmShowController.prototype, "getFilmShowById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les séances par salle' }),
    (0, swagger_1.ApiParam)({ name: 'roomId', description: 'ID de la salle' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des séances pour la salle spécifiée',
        type: [film_show_entity_1.FilmShow]
    }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Get)('room/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilmShowController.prototype, "getFilmShowsByRoom", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une séance' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la séance' }),
    (0, swagger_1.ApiBody)({ type: update_film_show_dto_1.UpdateFilmShowDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Séance mise à jour avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides ou salle non disponible' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_film_show_dto_1.UpdateFilmShowDto]),
    __metadata("design:returntype", Promise)
], FilmShowController.prototype, "updateFilmShow", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une séance' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la séance' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Séance supprimée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Séance non trouvée' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilmShowController.prototype, "deleteFilmShow", null);
exports.FilmShowController = FilmShowController = __decorate([
    (0, swagger_1.ApiTags)('film-shows'),
    (0, common_1.Controller)('film-shows'),
    __metadata("design:paramtypes", [film_show_service_1.FilmShowService])
], FilmShowController);
//# sourceMappingURL=film-show.controller.js.map