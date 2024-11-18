import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ description: 'Nom de la salle', example: 'Salle 1' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Capacité de la salle', example: 100, minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;
} 