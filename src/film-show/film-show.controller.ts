import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  BadRequestException 
} from '@nestjs/common';
import { FilmShowService } from './film-show.service';
import { FilmShow } from './film-show.entity';

@Controller('film-shows')
export class FilmShowController {
  constructor(private readonly filmShowService: FilmShowService) {}

  @Post()
  async createFilmShow(@Body() filmShow: FilmShow) {
    try {
      // Convertir les chaînes de date en objets Date
      filmShow.startDate = new Date(filmShow.startDate);
      filmShow.endDate = new Date(filmShow.endDate);

      // Vérifier que la date de fin est après la date de début
      if (filmShow.endDate <= filmShow.startDate) {
        throw new BadRequestException(
          'La date de fin doit être postérieure à la date de début'
        );
      }

      const result = await this.filmShowService.createFilmShow(filmShow);
      return {
        message: 'Séance de film créée avec succès',
        id: result
      };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la création de la séance: ${error.message}`
      );
    }
  }

  @Get()
  async getAllFilmShows() {
    try {
      return await this.filmShowService.getAllFilmShows();
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la récupération des séances: ${error.message}`
      );
    }
  }

  @Get(':id')
  async getFilmShowById(@Param('id') id: string) {
    try {
      return await this.filmShowService.getFilmShowById(id);
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la récupération de la séance: ${error.message}`
      );
    }
  }

  @Get('room/:roomId')
  async getFilmShowsByRoom(@Param('roomId') roomId: number) {
    try {
      return await this.filmShowService.getFilmShowsByRoom(roomId);
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la récupération des séances pour la salle: ${error.message}`
      );
    }
  }

  @Put(':id')
  async updateFilmShow(
    @Param('id') id: string,
    @Body() updatedData: Partial<FilmShow>
  ) {
    try {
      // Convertir les dates si elles sont présentes
      if (updatedData.startDate) {
        updatedData.startDate = new Date(updatedData.startDate);
      }
      if (updatedData.endDate) {
        updatedData.endDate = new Date(updatedData.endDate);
      }

      // Vérifier la cohérence des dates si les deux sont présentes
      if (updatedData.startDate && updatedData.endDate) {
        if (updatedData.endDate <= updatedData.startDate) {
          throw new BadRequestException(
            'La date de fin doit être postérieure à la date de début'
          );
        }
      }

      return await this.filmShowService.updateFilmShow(id, updatedData);
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la mise à jour de la séance: ${error.message}`
      );
    }
  }

  @Delete(':id')
  async deleteFilmShow(@Param('id') id: string) {
    try {
      return await this.filmShowService.deleteFilmShow(id);
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la suppression de la séance: ${error.message}`
      );
    }
  }
}
