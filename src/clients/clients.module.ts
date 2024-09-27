/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './client.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { IsUsernameUniqueValidator } from 'src/shared/validators/is-username-unique/is-username-unique';
import { SharedModule } from 'src/shared/shared.module';
import { Repository } from 'typeorm/repository/Repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]), 
    forwardRef(() => SharedModule)
  ],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    IsUsernameUniqueValidator,
    {
      provide: 'CLIENTS_SERVICE',
      useFactory: (clientsRepository: Repository<Client>) =>
        new ClientsService(clientsRepository),
      inject: [getRepositoryToken(Client)],
    },
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
