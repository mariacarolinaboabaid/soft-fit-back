import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateInstructorWorkDetailsDTO } from './create.dto';

export class UpdateInstructorsWorkDetailDto extends PartialType(
  OmitType(CreateInstructorWorkDetailsDTO, ['instructorId']),
) {}
