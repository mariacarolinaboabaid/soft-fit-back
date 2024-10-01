/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './client.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { IsUsernameUniqueValidator } from 'src/shared/validators/is-username-unique/is-username-unique';
import { SharedModule } from 'src/shared/shared.module';
import { Repository } from 'typeorm/repository/Repository';
import { ClientsStatisticsModule } from 'src/clients-statistics/clients-statistics.module';
import { ClientsStatisticsService } from 'src/clients-statistics/clients-statistics.service';
import { HashPasswordService } from 'src/shared/services/hash-password/hash-password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]), 
    forwardRef(() => SharedModule),
    ClientsStatisticsModule
  ],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    IsUsernameUniqueValidator,
    HashPasswordService,
    {
      provide: 'CLIENTS_SERVICE',
      useFactory: (
        clientsRepository: Repository<Client>,
        clientsStatisticsService: ClientsStatisticsService,
        hashPasswordService: HashPasswordService
      ) => new ClientsService(clientsRepository, clientsStatisticsService, hashPasswordService),
        
      inject: [getRepositoryToken(Client), ClientsStatisticsService],
    },
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
