import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspaces } from './entities/workspace.entity';
import { Repository } from 'typeorm';
import { Rooms } from 'src/rooms/entities/room.entity';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class WorkspacesService {

  constructor(
    @InjectRepository(Workspaces) private readonly workspaceRepository:Repository<Workspaces>,
    @InjectRepository(Rooms) private readonly roomsRepository: Repository<Rooms>,
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>
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


  /*View the list of available workspaces for a room in a
session x.*/
  async findAvailableWorkspaces(sessionId: number) {
    const query = `
      SELECT w.workspace_id, w.row_number, w.column_number, w.workspace_type, w.has_power_outlet
      FROM Workspaces w
      LEFT JOIN Reservations r ON w.workspace_id = r.workspace_id
      WHERE r.session_id = $1
        AND (r.reservation_id IS NULL OR r.status = 'cancelled');
    `;
    
    const availableWorkspaces = await this.workspaceRepository.query(query, [sessionId]);
    return availableWorkspaces;
  }


  /*View the list of occupied workspaces for a room in a
session x.*/
  async findOccupiedWorkspaces(sessionId: number) {
    const query = `
      SELECT w.workspace_id, w.row_number, w.column_number, w.workspace_type, w.has_power_outlet
      FROM Workspaces w
      LEFT JOIN Reservations r ON w.workspace_id = r.workspace_id
      WHERE r.session_id = $1
        AND r.status = 'confirmed';
    `;
    
    const occupiedWorkspaces = await this.workspaceRepository.query(query, [sessionId]);
    return occupiedWorkspaces;
  }


  /*View the list of workspaces assigned to a user.*/
  async findWorkspacesByUserId(userId: number): Promise<any[]> {
    const query = `
      SELECT u.user_id, u.username, w.workspace_id, w.row_number, w.column_number, w.workspace_type
      FROM Users u
      JOIN Reservations r ON u.user_id = r.user_id
      JOIN Workspaces w ON r.workspace_id = w.workspace_id
      WHERE u.user_id = $1;
    `;
    
    const workspaces = await this.workspaceRepository.query(query, [userId]);
    return workspaces;
  }


  /*View the list of workspaces assigned to a session.*/
  async findWorkspacesBySessionId(sessionId: number) {
    const query = `
      SELECT s.session_id, s.session_name, w.workspace_id, w.row_number, w.column_number, w.workspace_type
      FROM Sessions s
      JOIN Reservations r ON s.session_id = r.session_id
      JOIN Workspaces w ON r.workspace_id = w.workspace_id
      WHERE s.session_id = $1;
    `;
    
    const workspaces = await this.workspaceRepository.query(query, [sessionId]);
    return workspaces;
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
