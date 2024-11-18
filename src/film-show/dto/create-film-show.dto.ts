import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateFilmShowDto {
  @ApiProperty({ description: 'ID de la salle', example: 'salle-1' })
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @ApiProperty({ description: 'ID du film dans Firebase', example: 'Tbv1IhN4xvX7sV75UeLb' })
  @IsNotEmpty()
  @IsString()
  movieId: string;

  @ApiProperty({ 
    description: 'Date et heure de début de la séance', 
    example: '2024-03-20T14:30:00.000Z' 
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  endDate: Date;
}