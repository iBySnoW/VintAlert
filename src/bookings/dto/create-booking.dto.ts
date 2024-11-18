import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ description: 'ID de la séance', example: 'filmshow-123' })
  @IsNotEmpty()
  @IsString()
  filmShowId: string;

  @ApiProperty({ description: 'ID de l\'utilisateur', example: 'user-123' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Nombre de places', example: 2, minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numberOfSeats: number;
} 