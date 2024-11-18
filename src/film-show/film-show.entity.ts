import { Room } from '../rooms/rooms.entity';

export class FilmShow {
    id: number;
    room: Room;
    startDate: Date;
    endDate: Date;
}
