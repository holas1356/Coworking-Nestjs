import { Injectable, NotFoundException, Delete } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservations } from './entities/reservation.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Workspaces } from 'src/workspaces/entities/workspace.entity';
import { Sessions } from 'src/sessions/entities/session.entity';

@Injectable()
export class ReservationsService {

  constructor(
    @InjectRepository(Reservations) private readonly reservationsRepository:Repository<Reservations>,
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    @InjectRepository(Workspaces) private readonly workspaceRepository:Repository<Workspaces>,
    @InjectRepository(Sessions) private readonly sessionsRepository:Repository<Sessions>

  ){}
  async create(createReservationDto: CreateReservationDto){
    const { user_id, workspace_id, session_id } = createReservationDto;

    const user = await this.usersRepository.findOneBy({user_id});
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    const workspace = await this.workspaceRepository.findOneBy({workspace_id});
    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${workspace_id} not found`);
    }

    const session = await this.sessionsRepository.findOneBy({session_id});
    if (!session) {
      throw new NotFoundException(`Session with ID ${session_id} not found`);
    }

    const newReservation = this.reservationsRepository.create({
      ...createReservationDto,
      user,
      workspace,
      session,
    });

    return this.reservationsRepository.save(newReservation);
  }

  async findAll(){
    return this.reservationsRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.user', 'user')
      .leftJoinAndSelect('reservation.workspace', 'workspace')
      .leftJoinAndSelect('reservation.session', 'session')
      .getMany();
  }

  async findOne(id: number) {
    const reservation = await this.reservationsRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.user', 'user')
      .leftJoinAndSelect('reservation.workspace', 'workspace')
      .leftJoinAndSelect('reservation.session', 'session')
      .where('reservation.reservation_id = :id', { id })
      .getOne();

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    return reservation;
  }
  async update(reservation_id: number, updateReservationDto: CreateReservationDto) {
    const { user_id, workspace_id, session_id } = updateReservationDto;

    const existingReservation = await this.reservationsRepository.findOneBy({reservation_id});
    if (!existingReservation) {
      throw new NotFoundException(`Reservation with ID ${reservation_id} not found`);
    }

    if (user_id) {
      const user = await this.usersRepository.findOneBy({user_id});
      if (!user) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }
      existingReservation.user = user;
    }

    if (workspace_id) {
      const workspace = await this.workspaceRepository.findOneBy({workspace_id});
      if (!workspace) {
        throw new NotFoundException(`Workspace with ID ${workspace_id} not found`);
      }
      existingReservation.workspace = workspace;
    }

    if (session_id) {
      const session = await this.sessionsRepository.findOneBy({session_id});
      if (!session) {
        throw new NotFoundException(`Session with ID ${session_id} not found`);
      }
      existingReservation.session = session;
    }

    // Actualizar los demás campos según sea necesario
    Object.assign(existingReservation, updateReservationDto);

    return this.reservationsRepository.save(existingReservation);
  }

  async remove(id: number){
    const reservationToRemove = await this.reservationsRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.user', 'user')
      .leftJoinAndSelect('reservation.workspace', 'workspace')
      .leftJoinAndSelect('reservation.session', 'session')
      .where('reservation.reservation_id = :id', { id })
      .getOne();

    if (!reservationToRemove) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    await this.reservationsRepository.delete({ reservation_id: id });

    return reservationToRemove;
  }
}
