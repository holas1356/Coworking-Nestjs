import { IsString, IsEmail, IsOptional, Length, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  password: string;

  @IsString()
  @IsOptional()
  @Length(0, 100)
  full_name?: string;

  @IsPhoneNumber(null)
  @IsOptional()
  @Length(0, 15)
  phone_number?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  role: string;
}
