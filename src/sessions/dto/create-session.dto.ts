// create-session.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateSessionDto {
    @ApiProperty()
  @IsString()
  session_name?: string;

  @ApiProperty()
  @IsDateString()
  start_time?: Date;

  @ApiProperty()
  @IsDateString()
  end_time?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  max_capacity?: number;
}
