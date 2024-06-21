import { Rooms } from 'src/rooms/entities/room.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';


@Entity()
@Unique(['room_id', 'row_number', 'column_number'])
export class Workspaces {
  @PrimaryGeneratedColumn()
  workspace_id: number;

  @Column('int')
  room_id: number;

  @ManyToOne(() => Rooms, room => room.workspaces)
  @JoinColumn({ name: 'room_id' })
  room: Rooms;

  @Column('int')
  row_number: number;

  @Column('int')
  column_number: number;

  @Column({ length: 50, nullable: true })
  workspace_type: string;

  @Column('boolean', { default: false })
  has_power_outlet: boolean;
}
