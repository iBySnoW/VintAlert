"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/auth.guard");
const config_1 = require("@nestjs/config");
const firebase_module_1 = require("./firebase/firebase.module");
const rooms_module_1 = require("./rooms/rooms.module");
const bookings_module_1 = require("./bookings/bookings.module");
const movies_module_1 = require("./movies/movies.module");
const film_show_module_1 = require("./film-show/film-show.module");
const users_controller_1 = require("./users/users.controller");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: 'config/environment/.env',
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            firebase_module_1.FirebaseModule,
            rooms_module_1.RoomsModule,
            bookings_module_1.BookingsModule,
            movies_module_1.MoviesModule,
            film_show_module_1.FilmShowModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'swagger-static'),
                serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/docs',
            })
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController],
        providers: [
            app_service_1.AppService,
            config_1.ConfigService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map