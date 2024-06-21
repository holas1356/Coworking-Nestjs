import { IsString, IsInt, IsOptional, IsBoolean, Length, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @Length(1, 100)
  room_name: string;

  @IsInt()
  @Min(1)
  rows: number;

  @IsInt()
  @Min(1)
  columns: number;

  @IsString()
  @IsOptional()
  @Length(0, 200)
  location?: string;

  @IsBoolean()
  @IsOptional()
  has_projector?: boolean;

  @IsBoolean()
  @IsOptional()
  has_whiteboard?: boolean;
}
