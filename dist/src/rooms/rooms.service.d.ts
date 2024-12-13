import { FirebaseService } from '../firebase/firebase.service';
export declare class RoomsService {
    private firebaseService;
    private db;
    constructor(firebaseService: FirebaseService);
    createRoom(roomData: any): Promise<string>;
    getAllRooms(): Promise<{
        id: string;
    }[]>;
    getRoomById(id: string): Promise<{
        id: string;
    }>;
    getRoomCapacity(id: string): Promise<{
        capacity: any;
    }>;
    updateRoom(id: string, roomData: any): Promise<any>;
    deleteRoom(id: string): Promise<{
        id: string;
    }>;
    checkRoomCapacity(roomId: string, filmShowId: string): Promise<{
        isAvailable: boolean;
        maxCapacity: any;
        currentBookings: number;
        remainingSeats: number;
    }>;
}
