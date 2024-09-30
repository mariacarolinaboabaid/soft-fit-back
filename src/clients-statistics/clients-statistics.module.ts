import { Module } from '@nestjs/common';
import { ClientsStatisticsService } from './clients-statistics.service';
import { ClientsStatisticsController } from './clients-statistics.controller';
import { ClientStatistics } from './client-statistics.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClientStatistics])],
  controllers: [ClientsStatisticsController],
  providers: [ClientsStatisticsService],
  exports: [ClientsStatisticsService],
})
export class ClientsStatisticsModule {}
