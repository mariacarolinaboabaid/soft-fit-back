import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ClientStatistics } from '../clients-statistics/client-statistics.entity';
import { UpdateClientStatisticsDTO } from './dtos/update.dto';
import { CreateClientStatisticsDTO } from './dtos/create.dto';
import { ReturnClientStatisticsDTO } from './dtos/return.dto';

@Injectable()
export class ClientsStatisticsService {
  constructor(
    @InjectRepository(ClientStatistics)
    private readonly repository: Repository<ClientStatistics>,
  ) {}

  async getById(id: string) {
    const clientStatistics = await this.repository.findOne({
      where: { id: id },
    });
    if (!clientStatistics) {
      throw new NotFoundException(
        'Not found any statistics registered by this id.',
      );
    }
    return clientStatistics;
  }

  async getByClientId(clientId: string) {
    const clientStatistics = await this.repository.findOne({
      where: { client: { id: clientId } },
    });
    if (!clientStatistics) {
      throw new NotFoundException(
        'Not found any statistics registered by this Client id.',
      );
    }
    const clientStatisticsDTO = new ReturnClientStatisticsDTO(
      clientStatistics.totalCustomers,
      clientStatistics.totalDeliquentCustomers,
      clientStatistics.totalDeliquencyAmount,
      clientStatistics.totalRenewedEnrollments,
      clientStatistics.totalNewEnrollments,
      clientStatistics.totalCanceledEnrollments,
      clientStatistics.totalPremiumEnrollments,
      clientStatistics.totalBasicEnrollments,
    );
    return clientStatisticsDTO;
  }

  async create(createClientStatisticsDTO: CreateClientStatisticsDTO) {
    const clientStatistics = new ClientStatistics();
    const clientStatisticsId = uuid();
    clientStatistics.id = clientStatisticsId;
    Object.assign(clientStatistics, createClientStatisticsDTO);
    await this.repository.save(clientStatistics);
    return clientStatistics;
  }

  async update(id: string, updateClientStatistics: UpdateClientStatisticsDTO) {
    const clientStatistics = await this.getById(id);
    if (clientStatistics) {
      await this.repository.update(id, updateClientStatistics);
    }
  }

  async delete(id: string) {
    const clientStatistics = await this.getById(id);
    if (clientStatistics) {
      await this.repository.delete(id);
    }
  }
}
