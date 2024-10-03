import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCustomerDTO } from './create.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCustomerDTO extends PartialType(
  OmitType(CreateCustomerDTO, ['clientId', 'username', 'fiscalNumber']),
) {
  @IsBoolean({ message: 'Active must be a boolean.' })
  @IsOptional()
  active: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Deliquent must be a boolesn.' })
  deliquent: boolean;
}
