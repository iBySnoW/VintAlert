"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsModule = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
const rooms_service_1 = require("../rooms/rooms.service");
const bookings_controller_1 = require("./bookings.controller");
const firebase_service_1 = require("../firebase/firebase.service");
const movies_service_1 = require("../movies/movies.service");
const film_show_service_1 = require("../film-show/film-show.service");
let BookingsModule = class BookingsModule {
};
exports.BookingsModule = BookingsModule;
exports.BookingsModule = BookingsModule = __decorate([
    (0, common_1.Module)({
        providers: [bookings_service_1.BookingsService, firebase_service_1.FirebaseService, rooms_service_1.RoomsService, movies_service_1.MoviesService, film_show_service_1.FilmShowService],
        controllers: [bookings_controller_1.BookingsController]
    })
], BookingsModule);
//# sourceMappingURL=bookings.module.js.map