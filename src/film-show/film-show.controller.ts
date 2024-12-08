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
import { Public } from 'src/auth/AuthMetadata';
import { ApiBody, ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateFilmShowDto } from './dto/create-film-show.dto';
import { UpdateFilmShowDto } from './dto/update-film-show.dto';

@ApiTags('film-shows')
@Controller('film-shows')
export class FilmShowController {
  constructor(private readonly filmShowService: FilmShowService) {}

  @ApiOperation({ summary: 'Créer une nouvelle séance de film' })
  @ApiBody({ 
    type: CreateFilmShowDto,
    description: 'Données de la séance à créer',
    examples: {
      example1: {
        value: {
          roomId: "salle-1",
          movieId: "Tbv1IhN4xvX7sV75UeLb",
          startDate: "2024-03-20T14:30:00.000Z"
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Séance créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides ou salle non disponible' })
  @Public()
  @Post()
  async createFilmShow(@Body() createFilmShowDto: CreateFilmShowDto) {
    try {
      createFilmShowDto.startDate = new Date(createFilmShowDto.startDate);
      const result = await this.filmShowService.createFilmShow(createFilmShowDto);
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

  @ApiOperation({ summary: 'Récupérer toutes les séances' })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des séances avec les détails des films',
    type: [CreateFilmShowDto]
  })
  @Public()
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

  @ApiOperation({ summary: 'Récupérer une séance par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la séance' })
  @ApiResponse({ 
    status: 200, 
    description: 'Séance trouvée avec les détails du film',
    type: FilmShow
  })
  @ApiResponse({ status: 404, description: 'Séance non trouvée' })

  @Public()
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

  @ApiOperation({ summary: 'Récupérer les séances par salle' })
  @ApiParam({ name: 'roomId', description: 'ID de la salle' })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des séances pour la salle spécifiée',
    type: [FilmShow]
  })
  @Public()
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

  @ApiOperation({ summary: 'Mettre à jour une séance' })
  @ApiParam({ name: 'id', description: 'ID de la séance' })
  @ApiBody({ type: UpdateFilmShowDto })
  @ApiResponse({ status: 200, description: 'Séance mise à jour avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides ou salle non disponible' })
  @Put(':id')
  async updateFilmShow(
    @Param('id') id: string,
    @Body() updatedData: UpdateFilmShowDto
  ) {
    try {
      if (updatedData.startDate) {
        updatedData.startDate = new Date(updatedData.startDate);
      }
      if (updatedData.endDate) {
        updatedData.endDate = new Date(updatedData.endDate);
      }

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

  @ApiOperation({ summary: 'Supprimer une séance' })
  @ApiParam({ name: 'id', description: 'ID de la séance' })
  @ApiResponse({ status: 200, description: 'Séance supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Séance non trouvée' })
  @Public()
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
