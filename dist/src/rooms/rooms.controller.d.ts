import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomsService);
    createRoom(createRoomDto: CreateRoomDto): Promise<string>;
    getAllRooms(): Promise<{
        id: string;
    }[]>;
    getRoomById(id: string): Promise<{
        id: string;
    }>;
    updateRoom(id: string, updateRoomDto: UpdateRoomDto): Promise<any>;
    deleteRoom(id: string): Promise<{
        id: string;
    }>;
}
