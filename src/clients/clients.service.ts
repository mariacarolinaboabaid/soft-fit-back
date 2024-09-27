/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReturnClientDTO } from './dtos/return-client.dto';
import { UpdateClientDTO } from './dtos/update-client.dto';

@Injectable()
export class ClientsService {

    constructor(
        @InjectRepository(Client)
        private readonly clientsRepository: Repository<Client>
    ) { }

    async getById(id: string) {
        const client = await this.clientsRepository.findOne({ where: { id: id } });
        if (client === null) {
            throw new NotFoundException("Not found any client registered by this id.")
        }
        const clientDTO = new ReturnClientDTO(client.businessName,
            client.fiscalNumber,
            client.username,
            client.password,
            client.role,
            client.currency
        );
        return clientDTO;
    }

    async getByUsername(username: string) {
        const client = await this.clientsRepository.findOne({ where: { username: username } });
        return client;
    }

    async create(client: Client) {
        await this.clientsRepository.save(client);
    }

    async update(id: string, updatedClientData: UpdateClientDTO) {
        const checkIfClientExists = await this.getById(id);
        if (checkIfClientExists) {
            await this.clientsRepository.update(id, updatedClientData);
        }
    }

    async delete(id: string) {
        const checkIfClientExists = await this.getById(id);
        if (checkIfClientExists) {
            await this.clientsRepository.delete(id);
        }
    }
}
