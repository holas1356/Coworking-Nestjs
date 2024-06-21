// create-reservation.dto.ts

import {  IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateReservationDto {

  @IsString()
  user_id?: number;


  @IsString()
  workspace_id?: number;


  @IsString()
  session_id?: number;

  @IsDateString()
  reservation_time?: Date;

  
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  comments?: string;
}
