import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { InstructorWorkDetails } from './instructor-work-details.entity';
import { SalaryHistory } from './interfaces/salary-history.interface';
import { Instructor } from 'src/instructors/instructor.entity';
import { CreateInstructorWorkDetailsDTO } from './dtos/create.dto';
import { UpdateInstructorsWorkDetailsDTO } from './dtos/update.dto';

@Injectable()
export class InstructorsWorkDetailsService {
  constructor(
    @InjectRepository(InstructorWorkDetails)
    private readonly instructorWorkDetailsRepository: Repository<InstructorWorkDetails>,
  ) {}

  async getById(id: string) {
    const instructorWorkDetails =
      await this.instructorWorkDetailsRepository.findOne({ where: { id: id } });
    if (!instructorWorkDetails) {
      throw new NotFoundException(
        'Not found any work details registered by this id.',
      );
    }
    return instructorWorkDetails;
  }

  async create(
    createInstructorWorkDetailsDTO: CreateInstructorWorkDetailsDTO,
    instructor: Instructor,
  ) {
    const instructorWorkDetails = new InstructorWorkDetails();
    instructorWorkDetails.id = uuid();
    instructorWorkDetails.salaryHistory = [];
    instructorWorkDetails.salaryHistory.push(
      this.createRegisterForSalaryHistory(
        createInstructorWorkDetailsDTO.salary,
        createInstructorWorkDetailsDTO.hireDate,
      ),
    );
    instructorWorkDetails.payments = [];
    instructorWorkDetails.instructor = instructor;
    Object.assign(instructorWorkDetails, createInstructorWorkDetailsDTO);
    await this.instructorWorkDetailsRepository.save(instructorWorkDetails);
  }

  private createRegisterForSalaryHistory(salary: number, startDate: Date) {
    const salarayHistory = {} as SalaryHistory;
    salarayHistory.id = uuid();
    salarayHistory.value = salary;
    salarayHistory.startDate = startDate;
    salarayHistory.endDate = null;
    return salarayHistory;
  }

  async update(
    id: string,
    updateInstructorsWorkDetailDTO: UpdateInstructorsWorkDetailsDTO,
  ) {
    await this.instructorWorkDetailsRepository.update(
      id,
      updateInstructorsWorkDetailDTO,
    );
  }

  async delete(id: string) {
    await this.instructorWorkDetailsRepository.delete(id);
  }
}
