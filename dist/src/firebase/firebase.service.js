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
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const jwt_1 = require("@nestjs/jwt");
const admin = require("firebase-admin");
let FirebaseService = class FirebaseService {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
        const firebase = {
            apiKey: this.configService.get('FIREBASE_API_KEY'),
            authDomain: this.configService.get('FIREBASE_AUTH_DOMAIN'),
            projectId: this.configService.get('FIREBASE_PROJECT_ID'),
            storageBucket: this.configService.get('FIREBASE_STORAGE_BUCKET'),
            messagingSenderId: this.configService.get('FIREBASE_MESSAGING_SENDER_ID'),
            appId: this.configService.get('FIREBASE_APP_ID')
        };
        const adminCert = {
            projectId: this.configService.get('FIREBASE_ADMIN_project_id'),
            privateKey: this.configService.get('FIREBASE_ADMIN_private_key').replace(/\\n/g, '\n'),
            clientEmail: this.configService.get('FIREBASE_ADMIN_client_email')
        };
        if (!admin.apps.length) {
            this.adminApp = admin.initializeApp({
                credential: admin.credential.cert(adminCert)
            });
        }
        else {
            this.adminApp = admin.app();
        }
        this.adminAuth = admin.auth(this.adminApp);
        this.initializeFirebase(firebase);
        this.firestore = (0, firestore_1.getFirestore)(this.firebaseApp);
    }
    onModuleInit() {
    }
    getFirebaseApp() {
        return this.firebaseApp;
    }
    initializeFirebase(config) {
        this.firebaseApp = (0, app_1.initializeApp)(config);
        this.auth = (0, auth_1.getAuth)(this.firebaseApp);
    }
    async removeUser(userId) {
        try {
            await this.adminAuth.deleteUser(userId);
            return { message: 'Utilisateur supprimé avec succès' };
        }
        catch (error) {
            if (error.code === 'auth/user-not-found') {
                throw new common_1.NotFoundException('Utilisateur non trouvé');
            }
            throw new Error(`Erreur lors de la suppression de l'utilisateur: ${error.message}`);
        }
    }
    async create(email, password) {
        try {
            const userCredential = await (0, auth_1.createUserWithEmailAndPassword)(this.auth, email, password);
            return userCredential;
        }
        catch (error) {
            throw error;
        }
    }
    async signIn(email, password) {
        try {
            const userCredential = await (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password);
            const payload = { sub: userCredential.user.providerId, username: userCredential.user.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Identifiant de connexion invalide");
        }
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map