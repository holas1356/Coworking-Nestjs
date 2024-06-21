import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Users } from './users/entities/user.entity';
import { RoomsModule } from './rooms/rooms.module';
import { Rooms } from './rooms/entities/room.entity';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { SessionsModule } from './sessions/sessions.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.DB_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    UsersModule,
    RoomsModule,
    WorkspacesModule,
    SessionsModule,
    ReservationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
