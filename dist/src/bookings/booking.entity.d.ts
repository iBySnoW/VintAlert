import { User } from '../users/user.entity';
export declare class Booking {
    id: string;
    user: User;
    filmShowId: string;
    numberOfSeats: number;
}
