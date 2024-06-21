import { ApiProperty } from '@nestjs/swagger';
import { Reservations } from 'src/reservations/entities/reservation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Reservations, reservation => reservation.user)
  reservations: Reservations[];
}
