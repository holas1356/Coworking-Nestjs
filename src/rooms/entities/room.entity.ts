import { ApiProperty } from '@nestjs/swagger';
import { Workspaces } from 'src/workspaces/entities/workspace.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Rooms{
  @PrimaryGeneratedColumn()
  room_id: number;

  @ApiProperty()
  @Column({ length: 100 })
  room_name: string;

  @ApiProperty()
  @Column('int')
  rows: number;

  @ApiProperty()
  @Column('int')
  columns: number;

  @ApiProperty()
  @Column({ length: 200, nullable: true })
  location: string;

  @ApiProperty()
  @Column('boolean', { default: false })
  has_projector: boolean;

  @ApiProperty()
  @Column('boolean', { default: false })
  has_whiteboard: boolean;


  @OneToMany(() => Workspaces, workspace => workspace.room)
  workspaces: Workspaces[];
}
