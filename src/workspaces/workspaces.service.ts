import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspaces } from './entities/workspace.entity';
import { Repository } from 'typeorm';
import { Rooms } from 'src/rooms/entities/room.entity';

@Injectable()
export class WorkspacesService {

  constructor(
    @InjectRepository(Workspaces) private readonly workspaceRepository:Repository<Workspaces>,
    @InjectRepository(Rooms) private readonly roomsRepository: Repository<Rooms>
  ){}
  async create(createWorkspaceDto: CreateWorkspaceDto) {
    const { room_id } = createWorkspaceDto;
    const room = await this.roomsRepository.findOneBy({room_id});
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const newWorkspace = this.workspaceRepository.create({
      ...createWorkspaceDto,
      room,
    });

    return this.workspaceRepository.save(newWorkspace);
  }

  async findAll() {
    return this.workspaceRepository
    .createQueryBuilder('workspace')
    .leftJoinAndSelect('workspace.room', 'room')
    .getMany();
  }

  async findOne(id: number) {
   const workspace = await this.workspaceRepository
   .createQueryBuilder('workspace')
    .leftJoinAndSelect('workspace.room', 'room')
   .where('workspace.workspace_id = :id', { id })
    .getOne();
    if (!workspace) {
      throw new NotFoundException(`workspace with ID ${id} not found`);
    }
    return workspace
  }

  async update(workspace_id: number, updateWorkspaceDto: UpdateWorkspaceDto){
    const { room_id } = updateWorkspaceDto;
    const existingWorkspace = await this.workspaceRepository.findOneBy({workspace_id})
    if (!existingWorkspace) {
      throw new NotFoundException(`Workspace with ID ${workspace_id} not found`);
    }

    const room = await this.roomsRepository.findOneBy({room_id});
    if (!room) {
      throw new NotFoundException(`Room with ID ${room_id} not found`);
    }

    existingWorkspace.room = room;
    Object.assign(existingWorkspace, updateWorkspaceDto);

    return this.workspaceRepository.save(existingWorkspace);
  }

  async remove(id: number) {
    const workspaceToRemove = await this.workspaceRepository
      .createQueryBuilder('workspace')
      .leftJoinAndSelect('workspace.room', 'room') 
      .where('workspace.workspace_id = :id', { id })
      .getOne();

    if (!workspaceToRemove) {
      throw new NotFoundException(`Workspace with ID ${id} not found`);
    }

    await this.workspaceRepository.delete({ workspace_id: id });

    return workspaceToRemove;
  }
}
