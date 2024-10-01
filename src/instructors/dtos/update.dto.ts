import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateInstructorDTO } from './create.dto';

export class UpdateInstructorDTO extends PartialType(
  OmitType(CreateInstructorDTO, [
    'clientId',
    'username',
    'fiscalNumber',
    'workDetailsId',
  ]),
) {
  @IsBoolean({ message: 'Active must be a boolean.' })
  @IsOptional()
  active: boolean;
}
