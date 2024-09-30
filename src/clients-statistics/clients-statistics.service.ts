/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ClientStatistics } from '../clients-statistics/client-statistics.entity';
import { UpdateClientStatisticsDTO } from './dtos/update.dto';
import { CreateClientStatisticsDTO } from './dtos/create.dto';


@Injectable()
export class ClientsStatisticsService {

  constructor(
    @InjectRepository(ClientStatistics)
    private readonly clientStatisticsRepository: Repository<ClientStatistics>,
  ) { }

  async getById(id: string) {
    const clientStatistics = await this.clientStatisticsRepository.findOne({ where: { id: id } });
    if (clientStatistics === null) {
      throw new NotFoundException("Not found any statistics registered by this id.");
    }
    return clientStatistics;
  }

  async create(clientStatistics: CreateClientStatisticsDTO) {
    const statistics = new ClientStatistics();
    const statisticsId = uuid();
    statistics.id = statisticsId;
    Object.assign(statistics, clientStatistics);
    await this.clientStatisticsRepository.save(statistics);
    return statistics;
  }

  async update(id: string, updatedClientStatistics: UpdateClientStatisticsDTO) {
    const checkIfStatisticsExists = await this.getById(id);
    if (checkIfStatisticsExists) {
      await this.clientStatisticsRepository.update(id, updatedClientStatistics);
    }
  }

  async delete(id: string) {
    await this.clientStatisticsRepository.delete(id);
  }
}