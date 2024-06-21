import { ApiProperty } from '@nestjs/swagger';
import { Reservations } from 'src/reservations/entities/reservation.entity';
import { Rooms } from 'src/rooms/entities/room.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique, OneToMany } from 'typeorm';


@Entity()
@Unique(['room_id', 'row_number', 'column_number'])
export class Workspaces {
  @PrimaryGeneratedColumn()
  workspace_id: number;

  @ApiProperty()
  @Column('int')
  room_id: number;

  @ApiProperty()
  @ManyToOne(() => Rooms, room => room.workspaces)
  @JoinColumn({ name: 'room_id' })
  room: Rooms;

  @ApiProperty()
  @Column('int')
  row_number: number;

  @ApiProperty()
  @Column('int')
  column_number: number;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  workspace_type: string;

  @ApiProperty()
  @Column('boolean', { default: false })
  has_power_outlet: boolean;

  @OneToMany(() => Reservations, reservation => reservation.workspace)
  reservations: Reservations[];
}
