import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateFilmShowDto {
  @ApiProperty({ required: false, description: 'ID de la salle' })
  @IsOptional()
  @IsString()
  roomId?: string;

  @ApiProperty({ required: false, description: 'ID du film' })
  @IsOptional()
  @IsString()
  movieId?: string;

  @ApiProperty({ required: false, description: 'Date de début de la séance' })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({ required: false, description: 'Date de fin de la séance' })
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}