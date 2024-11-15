import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { Public } from '../auth/AuthMetadata'; // Assurez-vous d'avoir ce décorateur

@Controller('movies')
export class MoviesController {

}
