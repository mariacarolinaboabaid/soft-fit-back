/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Client } from './client.entity';
import { CreateClientDTO } from './dtos/create.dto';
import { ReturnClientDTO } from './dtos/return.dto';
import { UpdateClientDTO } from './dtos/update.dto';
import { ClientsStatisticsService } from 'src/clients-statistics/clients-statistics.service';
import { CreateClientStatisticsDTO } from 'src/clients-statistics/dtos/create.dto';
import { HashPasswordService } from 'src/shared/services/hash-password/hash-password.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
    private readonly clientsStatisticsService: ClientsStatisticsService,
    private readonly hashPasswordService: HashPasswordService
  ) {}

  async getById(id: string) {
    const client = await this.clientsRepository.findOne({
      where: { id: id },
      relations: ['statistics'],
    });
    if (client === null) {
      throw new NotFoundException(
        'Not found any client registered by this id.',
      );
    }
    const clientDTO = new ReturnClientDTO(
      client.businessName,
      client.fiscalNumber,
      client.username,
      client.currency,
      client.statistics.id,
    );
    return clientDTO;
  }

  async getByIdWithAllInformation(id: string) {
    const client = await this.clientsRepository.findOne({
      where: { id: id },
      relations: ['statistics', 'enrollments', 'customers'],
    });
    if (client === null) {
      throw new NotFoundException(
        'Not found any client registered by this id.',
      );
    }
    return client;
  }

  async getByUsername(username: string) {
    const client = await this.clientsRepository.findOne({
      where: { username: username },
    });
    return client;
  }

  async create(createClientDTO: CreateClientDTO) {
    const client = new Client();
    client.id = uuid();
    Object.assign(client, createClientDTO);
    client.password = await this.hashPasswordService.hashPassword(createClientDTO.password);
    client.statistics = await this.createClientStatitcs(client.id);
    await this.clientsRepository.save(client); 
    return client.id;
  }

  private async createClientStatitcs(clientId: string){
    const createClientStatisticsDTO = new CreateClientStatisticsDTO(clientId);
    return await this.clientsStatisticsService.create(createClientStatisticsDTO);
  }

  async update(id: string, updateClient: UpdateClientDTO) {
    const client = await this.getById(id);
    if (client) {
      await this.clientsRepository.update(id, updateClient);
    }
  }

  async delete(id: string) {
    const client = await this.getById(id);
    if (client) {
      const clientStatisticsId = client.statisticsId;
      await this.clientsStatisticsService.delete(clientStatisticsId);
      await this.clientsRepository.delete(id);
    }
  }
}
