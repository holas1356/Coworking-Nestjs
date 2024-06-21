import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sessions } from './entities/session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Sessions) private readonly sessionsRepository:Repository<Sessions>
  ){}
  async create(createSessionDto: CreateSessionDto){
    const newSession = this.sessionsRepository.create(createSessionDto);
    return this.sessionsRepository.save(newSession);
  }

  /*View the sessions in order of the busiest.*/
  async findSessionsOrderedByOccupancy() {
    const query = `
      SELECT s.session_id, s.session_name, s.start_time, s.end_time, s.max_capacity,
             COUNT(r.reservation_id) AS total_persons
      FROM Sessions s
      LEFT JOIN Reservations r ON s.session_id = r.session_id AND r.status = 'confirmed'
      GROUP BY s.session_id, s.session_name, s.start_time, s.end_time, s.max_capacity
      ORDER BY total_persons DESC;
    `;
    
    const sessions = await this.sessionsRepository.query(query);
    return sessions;
  }


  /*View the sessions in order by the most available.*/
  async findSessionsOrderedByAvailability() {
    const query = `
      SELECT s.session_id, s.session_name, s.start_time, s.end_time, s.max_capacity,
             s.max_capacity - COUNT(r.reservation_id) AS available_capacity
      FROM Sessions s
      LEFT JOIN Reservations r ON s.session_id = r.session_id AND r.status = 'confirmed'
      GROUP BY s.session_id, s.session_name, s.start_time, s.end_time, s.max_capacity
      ORDER BY available_capacity DESC;
    `;
    
    const sessions = await this.sessionsRepository.query(query);
    return sessions;
  }
  async findAll() {
    return this.sessionsRepository.find();
  }

  async findOne(session_id: number) {
    const session = await this.sessionsRepository.findOneBy({session_id});
    if (!session) {
      throw new NotFoundException(`Session with ID ${session_id} not found`);
    }
    return session;
  }

  async update(session_id: number, updateSessionDto: CreateSessionDto){
    const existingSession = await this.sessionsRepository.findOneBy({session_id});
    if (!existingSession) {
      throw new NotFoundException(`Session with ID ${session_id} not found`);
    }

    await this.sessionsRepository.update(session_id, updateSessionDto);
    return this.findOne(session_id);
  }

  async remove(id: number): Promise<void> {
    const session = await this.findOne(id); 
    await this.sessionsRepository.remove(session);
  }
}
