import { FirebaseService } from '../firebase/firebase.service';
export declare class UsersController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    removeUser(id: string): Promise<{
        message: string;
    }>;
}
