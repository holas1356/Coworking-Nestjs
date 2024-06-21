// create-session.dto.ts

import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  session_name: string;

  @IsNotEmpty()
  @IsDateString()
  start_time: Date;

  @IsNotEmpty()
  @IsDateString()
  end_time: Date;

  @IsOptional()
  @IsNumber()
  max_capacity?: number;
}
