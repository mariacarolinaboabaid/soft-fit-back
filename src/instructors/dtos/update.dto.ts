import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { CreateInstructorDTO } from './create.dto';
import { UpdateInstructorsWorkDetailsDTO } from 'src/instructors-work-details/dtos/update.dto';
import { Type } from 'class-transformer';

export class UpdateInstructorDTO extends PartialType(
  OmitType(CreateInstructorDTO, [
    'clientId',
    'username',
    'fiscalNumber',
    'createWorkDetailsDTO',
  ]),
) {
  @IsBoolean({ message: 'Active must be a boolean.' })
  @IsOptional()
  active: boolean;

  @ValidateNested()
  @Type(() => UpdateInstructorsWorkDetailsDTO)
  updateWorkDetailsDTO: UpdateInstructorsWorkDetailsDTO;
}
