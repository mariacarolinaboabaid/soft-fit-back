import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDTO } from './dtos/create-client.dto';
import { Client } from './client.entity';
import { v4 as uuid } from 'uuid';
import { UpdateClientDTO } from './dtos/update-client.dto';
import { PasswordHashPipe } from 'src/shared/pipes/password-hash/password-hash.pipe';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const client = await this.clientsService.getById(id);
    return client;
  }

  @Post()
  async create(@Body() createClientDTO: CreateClientDTO) {
    const client = new Client();
    client.id = uuid();
    Object.assign(client, createClientDTO);
    const passwordHashPipe = new PasswordHashPipe();
    client.password = await passwordHashPipe.transform(
      createClientDTO.password,
    );
    await this.clientsService.create(client);
    return {
      message: 'Client successfully created.',
      clientId: client.id,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDTO: UpdateClientDTO,
  ) {
    await this.clientsService.update(id, updateClientDTO);
    return {
      message: 'Client successfully updated.',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.clientsService.delete(id);
    return {
      message: 'Client successfully deleted.',
    };
  }
}
