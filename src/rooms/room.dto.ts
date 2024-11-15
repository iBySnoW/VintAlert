// src/modules/rooms/room.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'simple-array', nullable: true })
  equipment?: string[];

  @Column({ type: 'varchar', length: 100 })
  location: string;
}

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  capacity: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  equipment?: string[];

  @IsString()
  location: string;
}

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  capacity?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  equipment?: string[];

  @IsString()
  @IsOptional()
  location?: string;
}
