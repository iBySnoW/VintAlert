// src/modules/rooms/room.controller.ts
import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Public } from '../auth/AuthMetadata'; // Assurez-vous d'avoir ce décorateur
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomsService) {}

  @ApiOperation({ summary: 'Créer une nouvelle salle' })
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({ status: 201, description: 'Salle créée avec succès' })
  @Public()
  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  @ApiOperation({ summary: 'Récupérer toutes les salles' })
  @ApiResponse({ status: 200, description: 'Liste des salles récupérée' })
  @Public()
  @Get()
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @ApiOperation({ summary: 'Récupérer une salle par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la salle' })
  @ApiResponse({ status: 200, description: 'Salle trouvée' })
  @Public()
  @Get(':id')
  async getRoomById(@Param('id') id: string) {
    return this.roomService.getRoomById(id);
  }

  @ApiOperation({ summary: 'Mettre à jour une salle' })
  @ApiParam({ name: 'id', description: 'ID de la salle' })
  @ApiBody({ type: UpdateRoomDto })
  @ApiResponse({ status: 200, description: 'Salle mise à jour' })
  @Public()
  @Put(':id')
  async updateRoom(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.updateRoom(id, updateRoomDto);
  }

  @ApiOperation({ summary: 'Supprimer une salle' })
  @ApiParam({ name: 'id', description: 'ID de la salle' })
  @ApiResponse({ status: 200, description: 'Salle supprimée' })
  @Public()
  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }
}
