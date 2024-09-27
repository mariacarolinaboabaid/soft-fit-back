import { Module } from '@nestjs/common';
import { ClientsStatisticsService } from './clients-statistics.service';
import { ClientsStatisticsController } from './clients-statistics.controller';

@Module({
  controllers: [ClientsStatisticsController],
  providers: [ClientsStatisticsService],
})
export class ClientsStatisticsModule {}
