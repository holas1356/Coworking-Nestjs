
import { Sessions } from 'src/sessions/entities/session.entity';
import { Users } from 'src/users/entities/user.entity';
import { Workspaces } from 'src/workspaces/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Reservations {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @ManyToOne(() => Users, user => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Workspaces, workspace => workspace.reservations)
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspaces;

  @ManyToOne(() => Sessions, session => session.reservations)
  @JoinColumn({ name: 'session_id' })
  session: Sessions;

  @Column({ type: 'timestamp' })
  reservation_time: Date;

  @Column({ length: 20 })
  status: string;

  @Column({ type: 'text', nullable: true })
  comments: string;
}
