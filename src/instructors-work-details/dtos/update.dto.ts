import { PartialType } from '@nestjs/mapped-types';
import { CreateInstructorWorkDetailsDTO } from './create.dto';

export class UpdateInstructorsWorkDetailsDTO extends PartialType(
  CreateInstructorWorkDetailsDTO,
) {}
