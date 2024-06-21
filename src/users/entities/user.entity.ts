import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  user_id: number;

  @ApiProperty()
  @Column({ length: 50 })
  username: string;

  @ApiProperty()
  @Column({ length: 100 })
  email: string;

  @ApiProperty()
  @Column({ length: 100 })
  password: string;

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  full_name: string;

  @ApiProperty()
  @Column({ length: 15, nullable: true })
  phone_number: string;

  @ApiProperty()
  @Column({ length: 20 })
  role: string;
}
