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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("./rooms.service");
const AuthMetadata_1 = require("../auth/AuthMetadata");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
const swagger_1 = require("@nestjs/swagger");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async createRoom(createRoomDto) {
        return this.roomService.createRoom(createRoomDto);
    }
    async getAllRooms() {
        return this.roomService.getAllRooms();
    }
    async getRoomById(id) {
        return this.roomService.getRoomById(id);
    }
    async updateRoom(id, updateRoomDto) {
        return this.roomService.updateRoom(id, updateRoomDto);
    }
    async deleteRoom(id) {
        return this.roomService.deleteRoom(id);
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle salle' }),
    (0, swagger_1.ApiBody)({ type: create_room_dto_1.CreateRoomDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Salle créée avec succès' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les salles' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des salles récupérée' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getAllRooms", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une salle par son ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la salle' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Salle trouvée' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une salle' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la salle' }),
    (0, swagger_1.ApiBody)({ type: update_room_dto_1.UpdateRoomDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Salle mise à jour' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "updateRoom", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une salle' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la salle' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Salle supprimée' }),
    (0, AuthMetadata_1.Public)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "deleteRoom", null);
exports.RoomController = RoomController = __decorate([
    (0, swagger_1.ApiTags)('rooms'),
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomController);
//# sourceMappingURL=rooms.controller.js.map