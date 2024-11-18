import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class MovieDto {
  @ApiProperty({ description: 'ID du film dans TMDB', example: 550 })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Titre du film', example: 'Fight Club' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Durée en minutes', example: 139 })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({ description: 'Note moyenne', example: 8.4 })
  @IsNotEmpty()
  @IsNumber()
  vote_average: number;

  @ApiProperty({ description: 'Chemin de l\'affiche', example: '/path/to/poster.jpg' })
  @IsNotEmpty()
  @IsString()
  poster_path: string;
} 