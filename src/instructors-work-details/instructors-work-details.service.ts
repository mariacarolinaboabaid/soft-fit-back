import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { InstructorWorkDetails } from './instructor-work-details.entity';
import { SalaryHistory } from './interfaces/salary-history.interface';
import { Instructor } from 'src/instructors/instructor.entity';
import { CreateInstructorWorkDetailsDTO } from './dtos/create.dto';
import { UpdateInstructorsWorkDetailsDTO } from './dtos/update.dto';
import { Currency } from 'src/shared/enums/currency/currency.enum';
import { UpdateInstructorsWorkDetailsRatingDTO } from './dtos/update-rating.dto';

@Injectable()
export class InstructorsWorkDetailsService {
  constructor(
    @InjectRepository(InstructorWorkDetails)
    private readonly repository: Repository<InstructorWorkDetails>,
  ) {}

  async getById(id: string) {
    const instructorWorkDetails = await this.repository.findOne({
      where: { id: id },
    });
    if (!instructorWorkDetails) {
      throw new NotFoundException(
        'Not found any work details registered by this id.',
      );
    }
    return instructorWorkDetails;
  }

  async getByInstuctortId(instructorId: string) {
    const instructor = await this.repository.findOne({
      where: { instructor: { id: instructorId } },
    });
    if (!instructor) {
      throw new NotFoundException(
        'Not found any instructor registered by this id.',
      );
    }
    return instructor;
  }

  async create(
    createInstructorWorkDetailsDTO: CreateInstructorWorkDetailsDTO,
    instructor: Instructor,
    currency: Currency,
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
    instructorWorkDetails.currency = currency;
    instructorWorkDetails.ratingValue = 0;
    instructorWorkDetails.ratingVotesQuantity = 0;
    Object.assign(instructorWorkDetails, createInstructorWorkDetailsDTO);
    await this.repository.save(instructorWorkDetails);
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
    await this.repository.update(id, updateInstructorsWorkDetailDTO);
  }

  async updateRating(
    instructorId: string,
    updateRatingValueDTO: UpdateInstructorsWorkDetailsRatingDTO,
  ) {
    const instructorWorkDetails = await this.getByInstuctortId(instructorId);
    if (instructorWorkDetails) {
      instructorWorkDetails.ratingVotesQuantity++;
      const updatedRatingValue =
        (instructorWorkDetails.ratingValue + updateRatingValueDTO.ratingValue) /
        instructorWorkDetails.ratingVotesQuantity;
      instructorWorkDetails.ratingValue = updatedRatingValue;
    }
    await this.repository.update(
      instructorWorkDetails.id,
      instructorWorkDetails,
    );
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
