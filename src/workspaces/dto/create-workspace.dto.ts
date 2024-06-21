import { IsInt, IsString, IsBoolean, IsOptional, Length, Min } from 'class-validator';

export class CreateWorkspaceDto {
  @IsInt()
  room_id: number;

  @IsInt()
  @Min(1)
  row_number: number;

  @IsInt()
  @Min(1)
  column_number: number;

  @IsString()
  @IsOptional()
  @Length(0, 50)
  workspace_type?: string;

  @IsBoolean()
  @IsOptional()
  has_power_outlet?: boolean;
}
