import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateRoomDto {
  @ApiProperty({ required: false, description: 'Nom de la salle', example: 'Salle 1' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, description: 'Capacité de la salle', example: 100, minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;
} 