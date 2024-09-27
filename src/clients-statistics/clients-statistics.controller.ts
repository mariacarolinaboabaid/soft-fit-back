import { Controller } from '@nestjs/common';
import { ClientsStatisticsService } from './clients-statistics.service';

@Controller('clients-statistics')
export class ClientsStatisticsController {
  constructor(private readonly clientsStatisticsService: ClientsStatisticsService) {}
}
