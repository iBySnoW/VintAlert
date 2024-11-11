// src/modules/rooms/room.controller.ts
import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './room.dto';
import { Public } from '../auth/AuthMetadata'; // Assurez-vous d'avoir ce décorateur

import { CreateRoomDto, UpdateRoomDto } from './room.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomsService) {}

  // Endpoint pour créer une nouvelle salle
  @Public()

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  // Endpoint pour récupérer toutes les salles
  @Public()

  @Get()
  async getAllRooms(){
    return this.roomService.getAllRooms();
  }

  // Endpoint pour récupérer les détails d'une salle par ID
    @Public()

  @Get(':id')
  async getRoomById(@Param('id', ParseIntPipe) id: string) {
    return this.roomService.getRoomById(id);
  }

  // Endpoint pour modifier une salle
    @Public()

  @Put(':id')
  async updateRoom(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomService.updateRoom(id, updateRoomDto);
  }

  // Endpoint pour supprimer une salle
    @Public()

  @Delete(':id')
  async deleteRoom(@Param('id', ParseIntPipe) id: string){
    return this.roomService.deleteRoom(id);
  }
}
