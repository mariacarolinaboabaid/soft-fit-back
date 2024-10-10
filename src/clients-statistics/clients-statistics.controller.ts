import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientsStatisticsService } from './clients-statistics.service';
import { UpdateClientStatisticsDTO } from './dtos/update.dto';
import { VerifyUserTokenGuard } from 'src/authentication/guards/verify-user-token/verify-user-token.guard';
import { UserPayload } from 'src/authentication/interfaces/user-payload.interface';

@UseGuards(VerifyUserTokenGuard)
@Controller('clients-statistics')
export class ClientsStatisticsController {
  constructor(
    private readonly clientsStatisticsService: ClientsStatisticsService,
  ) {}

  @Get()
  async getByClientId(@Req() request: UserPayload) {
    const clientId = request.sub;
    const statistics =
      await this.clientsStatisticsService.getByClientId(clientId);
    return statistics;
  }

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
