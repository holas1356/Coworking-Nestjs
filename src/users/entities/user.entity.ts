import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100, nullable: true })
  full_name: string;

  @Column({ length: 15, nullable: true })
  phone_number: string;

  @Column({ length: 20 })
  role: string;
}
