import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsBoolean, Length, Min } from 'class-validator';

export class CreateRoomDto {
    @ApiProperty()
    @IsString()
  @Length(1, 100)
  room_name: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  rows: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  columns: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(0, 200)
  location?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  has_projector?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  has_whiteboard?: boolean;
}
