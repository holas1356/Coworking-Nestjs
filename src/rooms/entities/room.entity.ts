import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column({ length: 100 })
  room_name: string;

  @Column('int')
  rows: number;

  @Column('int')
  columns: number;

  @Column({ length: 200, nullable: true })
  location: string;

  @Column('boolean', { default: false })
  has_projector: boolean;

  @Column('boolean', { default: false })
  has_whiteboard: boolean;
}
