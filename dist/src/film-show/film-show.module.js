"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmShowModule = void 0;
const common_1 = require("@nestjs/common");
const film_show_controller_1 = require("./film-show.controller");
const film_show_service_1 = require("./film-show.service");
const firebase_service_1 = require("../firebase/firebase.service");
const movies_service_1 = require("../movies/movies.service");
let FilmShowModule = class FilmShowModule {
};
exports.FilmShowModule = FilmShowModule;
exports.FilmShowModule = FilmShowModule = __decorate([
    (0, common_1.Module)({
        controllers: [film_show_controller_1.FilmShowController],
        providers: [film_show_service_1.FilmShowService, firebase_service_1.FirebaseService, movies_service_1.MoviesService],
        exports: [film_show_service_1.FilmShowService],
    })
], FilmShowModule);
//# sourceMappingURL=film-show.module.js.map