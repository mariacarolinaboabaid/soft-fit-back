import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateEnrollmentDTO } from './create.dto';

export class UpdateEnrollmentDTO extends PartialType(
  OmitType(CreateEnrollmentDTO, ['clientId', 'enrollment']),
) {}
