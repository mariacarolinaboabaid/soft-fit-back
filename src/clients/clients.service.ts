/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReturnClientDTO } from './dtos/return.dto';
import { UpdateClientDTO } from './dtos/update.dto';
import { ClientsStatisticsService } from 'src/clients-statistics/clients-statistics.service';
import { CreateClientStatisticsDTO } from 'src/clients-statistics/dtos/create.dto';

@Injectable()
export class ClientsService {

    constructor(
        @InjectRepository(Client)
        private readonly clientsRepository: Repository<Client>,
        private readonly clientsStatisticsService: ClientsStatisticsService
    ) { }

    async getById(id: string) {
        const client = await this.clientsRepository.findOne({ 
            where:{ id: id },
            relations: ['statistics']
        });
        if (client === null) {
            throw new NotFoundException("Not found any client registered by this id.")
        }
        const clientDTO = new ReturnClientDTO(client.businessName,
            client.fiscalNumber,
            client.username,
            client.role,
            client.currency,
            client.statistics.id
        );
        return clientDTO;
    }

    async getByUsername(username: string) {
        const client = await this.clientsRepository.findOne({ where: { username: username }});
        return client;
    }

    async create(client: Client) {
        const clientId = client.id;
        const newStatisticsDTO = new CreateClientStatisticsDTO(clientId);
        const newStatistics = await this.clientsStatisticsService.create(newStatisticsDTO);
        client.statistics = newStatistics;
        await this.clientsRepository.save(client);
    }

    async update(id: string, updatedClient: UpdateClientDTO) {
        const checkIfClientExists = await this.getById(id);
        if (checkIfClientExists) {
            await this.clientsRepository.update(id, updatedClient);
        }
    }

    async delete(id: string) {
        const checkIfClientExists = await this.getById(id);
        if (checkIfClientExists) {
            const statisticsId = checkIfClientExists.statisticsId;
            await this.clientsStatisticsService.delete(statisticsId);
            await this.clientsRepository.delete(id);
        }
    }
}
