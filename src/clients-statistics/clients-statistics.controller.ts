import { Body, Controller, Param, Put } from '@nestjs/common';
import { ClientsStatisticsService } from './clients-statistics.service';
import { UpdateClientStatisticsDTO } from './dtos/update.dto';

@Controller('clients-statistics')
export class ClientsStatisticsController {
  constructor(
    private readonly clientsStatisticsService: ClientsStatisticsService,
  ) {}

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateClientStatisticsDTO: UpdateClientStatisticsDTO,
  ) {
    await this.clientsStatisticsService.update(id, updateClientStatisticsDTO);
    return {
      message: 'Statistics successfully updated.',
    };
  }
}
