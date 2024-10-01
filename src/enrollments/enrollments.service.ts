/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Enrollment } from './enrollment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UpdateEnrollmentDTO } from './dtos/update.dto';
import { ReturnEnrollmentDTO } from './dtos/return.dto';
import { CreateEnrollmentDTO } from './dtos/create.dto';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepository: Repository<Enrollment>,
    private readonly clientsService: ClientsService,
  ) { }

  async getById(id: string) {
    const enrollment = await this.enrollmentsRepository.findOne({
      where: { id: id },
      relations: ['client']
    });
    if (enrollment === null) {
      throw new NotFoundException(
        'Not found any enrollment registered by this id.',
      );
    }

    return enrollment;
  }

  async getByClientId(clientId: string) {
    const enrollments = await this.enrollmentsRepository.find({
      where: { client: { id: clientId } }
    });
    if (enrollments === null) {
      throw new NotFoundException(
        'Not found any enrollment registered by this clientId.',
      );
    }
    enrollments.map(enrollment => new ReturnEnrollmentDTO(
          enrollment.id,
          enrollment.enrollment,
          enrollment.monthlyFee,
        ),
    );
    return enrollments;
  }

  async create(createEnrollmentDTO: CreateEnrollmentDTO) {
    const clientId = createEnrollmentDTO.clientId;
    const client = await this.clientsService.getByIdWithAllInformation(clientId);
    if (client) {
      const enrollment = new Enrollment();
      enrollment.id = uuid();
      enrollment.client = client;
      enrollment.enrollment = createEnrollmentDTO.enrollment;
      enrollment.monthlyFee = createEnrollmentDTO.monthlyFee;
      await this.enrollmentsRepository.save(enrollment);
      return enrollment.id;
    }
  }

  async update(id: string, updateEnrollmentDTO: UpdateEnrollmentDTO) {
    const enrollment = await this.getById(id);
    if (enrollment) {
      await this.enrollmentsRepository.update(id, updateEnrollmentDTO);
    }
  }

  async delete(id: string) {
    const enrollment = await this.getById(id);
    if (enrollment) {
      await this.enrollmentsRepository.delete(id);
    }
  }
}
