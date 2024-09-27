import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateClientDTO } from './create-client.dto';

export class UpdateClientDTO extends PartialType(
  OmitType(CreateClientDTO, ['fiscalNumber', 'username', 'role']),
) {}
