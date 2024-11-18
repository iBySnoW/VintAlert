import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, Min } from 'class-validator';

export class UpdateBookingDto {
  @ApiProperty({ required: false, description: 'ID de la séance', example: 'abc123' })
  @IsOptional()
  @IsString()
  filmShowId?: string;

  @ApiProperty({ required: false, description: 'Nombre de places', example: 2, minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  numberOfSeats?: number;
} 