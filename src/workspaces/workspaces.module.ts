import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspaces } from './entities/workspace.entity';
import { Rooms } from 'src/rooms/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspaces, Rooms])],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {}
