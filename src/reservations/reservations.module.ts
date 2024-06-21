import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from './entities/reservation.entity';
import { Sessions } from 'src/sessions/entities/session.entity';
import { Workspaces } from 'src/workspaces/entities/workspace.entity';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservations, Sessions, Users, Workspaces])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
