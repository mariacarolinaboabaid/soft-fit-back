import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Instructor } from './instructor.entity';
import { CreateInstructorDTO } from './dtos/create.dto';
import { UpdateInstructorDTO } from './dtos/update.dto';
import { HashPasswordService } from 'src/shared/services/hash-password/hash-password.service';
import { ClientsService } from 'src/clients/clients.service';
import { InstructorsWorkDetailsService } from 'src/instructors-work-details/instructors-work-details.service';
import { ReturnBestRatedInstructorsDTO } from './dtos/return-best-rated.dto';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectRepository(Instructor)
    private readonly repository: Repository<Instructor>,
    private readonly clientsService: ClientsService,
    private readonly instructorsWorkDetailsService: InstructorsWorkDetailsService,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async getAll() {
    const instructors = await this.repository.find({
      relations: ['client', 'workDetails'],
    });
    return instructors;
  }

  async getById(id: string) {
    const instructor = await this.repository.findOne({
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
    const instructors = await this.repository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'workDetails'],
    });
    return instructors;
  }

  async getByUsername(username: string) {
    const instructor = await this.repository.findOne({
      where: { username: username },
    });
    return instructor;
  }

  async getBestRatedInstructorsByClientId(clientId: string) {
    const instructors = await this.repository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'workDetails'],
    });
    const sortedInstructors = instructors
      .sort((a, b) => {
        return b.workDetails.ratingValue - a.workDetails.ratingValue;
      })
      .slice(0, 5);
    const sortedInstructorsDTO = sortedInstructors.map((instructor) => {
      const fullName = instructor.firstName + ' ' + instructor.lastName;
      return new ReturnBestRatedInstructorsDTO(
        instructor.id,
        fullName,
        instructor.workDetails.ratingValue,
        instructor.workDetails.ratingVotesQuantity,
      );
    });
    return sortedInstructorsDTO;
  }

  async getCountTotalInstructorsByClientId(clientId: string) {
    const count = await this.repository.count({
      where: { client: { id: clientId } },
    });
    return count;
  }

  async create(createInstructorDTO: CreateInstructorDTO) {
    const { createWorkDetailsDTO, ...onlyInstructorDTO } = createInstructorDTO;
    const clientInformation = await this.getClientInformation(
      onlyInstructorDTO.clientId,
    );
    const instructor = new Instructor();
    Object.assign(instructor, onlyInstructorDTO);
    instructor.id = uuid();
    instructor.active = true;
    instructor.client = clientInformation;
    instructor.enrollmentNumber = await this.generateEnrollmentNumber(
      clientInformation.id,
    );
    instructor.password = await this.hashPasswordService.hashPassword(
      onlyInstructorDTO.password,
    );
    await this.repository.save(instructor);
    await this.instructorsWorkDetailsService.create(
      createWorkDetailsDTO,
      instructor,
      clientInformation.currency,
    );
    return instructor.id;
  }

  private async getClientInformation(clientId: string) {
    return await this.clientsService.getByIdWithAllInformation(clientId);
  }

  private async generateEnrollmentNumber(clientId: string) {
    const totalInstructorsClient =
      await this.getCountTotalInstructorsByClientId(clientId);
    const enrollmentNumber = totalInstructorsClient + 1;
    return enrollmentNumber.toString();
  }

  async update(id: string, updateInstructorDTO: UpdateInstructorDTO) {
    const { updateWorkDetailsDTO, ...onlyInstructorDTO } = updateInstructorDTO;
    const instructor = await this.getById(id);
    const workDetailsId = instructor.workDetails.id;
    if (instructor) {
      await this.repository.update(id, onlyInstructorDTO);
      await this.instructorsWorkDetailsService.update(
        workDetailsId,
        updateWorkDetailsDTO,
      );
    }
  }

  async updatePropertyActive(id: string) {
    const instructor = await this.getById(id);
    if (instructor) {
      instructor.active = !instructor.active;
      if (instructor.active) {
        instructor.inactiveDate = null;
      } else {
        const today = new Date();
        instructor.inactiveDate = today;
      }
      await this.repository.update(id, instructor);
    }
  }

  async delete(id: string) {
    const instructor = await this.getById(id);
    const workDetailsId = instructor.workDetails.id;
    if (instructor) {
      await this.repository.delete(id);
      await this.instructorsWorkDetailsService.delete(workDetailsId);
    }
  }
}
