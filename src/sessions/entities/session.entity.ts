// session.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sessions {
  @PrimaryGeneratedColumn()
  session_id: number;

  @Column({ length: 100 })
  session_name: string;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ nullable: true })
  max_capacity: number;
}
