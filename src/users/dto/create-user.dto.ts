import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, Length, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
@ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(0, 100)
  full_name?: string;

  @ApiProperty()
  @IsPhoneNumber(null)
  @IsOptional()
  @Length(0, 15)
  phone_number?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  role: string;
}
