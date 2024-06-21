import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsOptional, Length, Min } from 'class-validator';

export class CreateWorkspaceDto {
    @ApiProperty()  
  @IsInt()
  room_id: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  row_number: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  column_number: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(0, 50)
  workspace_type?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  has_power_outlet?: boolean;
}
