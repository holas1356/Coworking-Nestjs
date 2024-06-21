import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms) private readonly roomsRepository: Repository<Rooms>
  ){}
  async create(createRoomDto: CreateRoomDto) {
    const newRoom = this.roomsRepository.create(createRoomDto);
    return this.roomsRepository.save(newRoom);
  }

  async findAll(){
    return this.roomsRepository.find();
  }

  async findOne(id: number){
    return this.roomsRepository.findOneBy({ room_id: id });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    await this.roomsRepository.update(id, updateRoomDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.roomsRepository.delete(id);
  }
}
