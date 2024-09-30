import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateClientStatisticsDTO } from './create.dto';

export class UpdateClientStatisticsDTO extends PartialType(
  OmitType(CreateClientStatisticsDTO, ['clientId']),
) {}
