import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Instructor } from './instructor.entity';
import { Repository } from 'typeorm';
import { HashPasswordService } from 'src/shared/services/hash-password/hash-password.service';
import { ClientsService } from 'src/clients/clients.service';
import { CreateInstructorDTO } from './dtos/create.dto';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorsRepository: Repository<Instructor>,
    private readonly clientsService: ClientsService,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async getAll() {
    const instructors = await this.instructorsRepository.find({
      relations: ['client', 'workDetails'],
    });
    return instructors;
  }

  async getById(id: string) {
    const instructor = await this.instructorsRepository.findOne({
      where: { id: id },
      relations: ['client', 'workDetails'],
    });
    if (!instructor) {
      throw new NotFoundException(
        'Not found any instructor registered by this client id.',
      );
    }
    return instructor;
  }

  async getByClientId(clientId: string) {
    const instructors = await this.instructorsRepository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'workDetails'],
    });
    return instructors;
  }

  async getByUsername(username: string) {
    const instructor = await this.instructorsRepository.findOne({
      where: { username: username },
      relations: ['client', 'workDetails'],
    });
    return instructor;
  }

  async create(createInstructorDTO: CreateInstructorDTO) {
    const instructor = new Instructor();
    Object.assign(instructor, createInstructorDTO);
    instructor.id = uuid();
    instructor.active = true;
    instructor.client = await this.getClientInformation(
      createInstructorDTO.clientId,
    );
    instructor.password = await this.hashPasswordService.hashPassword(
      createInstructorDTO.password,
    );
    await this.instructorsRepository.save(instructor);
    return instructor.id;
  }

  private async getClientInformation(clientId: string) {
    return await this.clientsService.getByIdWithAllInformation(clientId);
  }

  async delete(id: string) {
    await this.instructorsRepository.delete(id);
  }
}
