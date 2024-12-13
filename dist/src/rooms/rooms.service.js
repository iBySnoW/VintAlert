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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const firestore_1 = require("firebase/firestore");
let RoomsService = class RoomsService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.db = (0, firestore_1.getFirestore)(this.firebaseService.getFirebaseApp());
    }
    async createRoom(roomData) {
        console.log("createROOM");
        try {
            const roomsRef = (0, firestore_1.collection)(this.db, 'rooms');
            const docRef = await (0, firestore_1.addDoc)(roomsRef, roomData);
            return docRef.id;
        }
        catch (error) {
            throw new Error(`Error creating room: ${error}`);
        }
    }
    async getAllRooms() {
        try {
            const roomsRef = (0, firestore_1.collection)(this.db, 'rooms');
            const snapshot = await (0, firestore_1.getDocs)(roomsRef);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }
        catch (error) {
            throw new Error(`Error fetching rooms: ${error}`);
        }
    }
    async getRoomById(id) {
        try {
            const roomRef = (0, firestore_1.doc)(this.db, 'rooms', id);
            const roomSnap = await (0, firestore_1.getDoc)(roomRef);
            if (roomSnap.exists()) {
                return { id: roomSnap.id, ...roomSnap.data() };
            }
            else {
                throw new Error('Room not found');
            }
        }
        catch (error) {
            throw new Error(`Error fetching room: ${error}`);
        }
    }
    async getRoomCapacity(id) {
        try {
            const roomRef = (0, firestore_1.doc)(this.db, 'rooms', id);
            const roomSnap = await (0, firestore_1.getDoc)(roomRef);
            if (!roomSnap.exists()) {
                throw new Error('Room not found');
            }
            const roomData = roomSnap.data();
            return { capacity: roomData.capacity };
        }
        catch (error) {
            throw new Error(`Error fetching room capacity: ${error}`);
        }
    }
    async updateRoom(id, roomData) {
        try {
            const roomRef = (0, firestore_1.doc)(this.db, 'rooms', id);
            await (0, firestore_1.updateDoc)(roomRef, roomData);
            return { id, ...roomData };
        }
        catch (error) {
            throw new Error(`Error updating room: ${error}`);
        }
    }
    async deleteRoom(id) {
        try {
            const roomRef = (0, firestore_1.doc)(this.db, 'rooms', id);
            await (0, firestore_1.deleteDoc)(roomRef);
            return { id };
        }
        catch (error) {
            throw new Error(`Error deleting room: ${error}`);
        }
    }
    async checkRoomCapacity(roomId, filmShowId) {
        try {
            const roomCapacity = await this.getRoomCapacity(roomId);
            const bookingsRef = (0, firestore_1.collection)(this.db, 'bookings');
            const bookingsQuery = (0, firestore_1.query)(bookingsRef, (0, firestore_1.where)('filmShowId', '==', filmShowId));
            const bookingsSnapshot = await (0, firestore_1.getDocs)(bookingsQuery);
            const currentBookings = bookingsSnapshot.size;
            const remainingSeats = roomCapacity.capacity - currentBookings;
            return {
                isAvailable: remainingSeats > 0,
                maxCapacity: roomCapacity.capacity,
                currentBookings,
                remainingSeats
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la vérification de la capacité: ${error.message}`);
        }
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map