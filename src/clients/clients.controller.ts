import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDTO } from './dtos/create.dto';
import { UpdateClientDTO } from './dtos/update.dto';
import { VerifyUserTokenGuard } from 'src/authentication/guards/verify-user-token/verify-user-token.guard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(VerifyUserTokenGuard)
  @Get('/:id')
  async getById(@Param('id') id: string) {
    const client = await this.clientsService.getById(id);
    return client;
  }

  @Post()
  async create(@Body() createClientDTO: CreateClientDTO) {
    const clientId = await this.clientsService.create(createClientDTO);
    return {
      message: 'Client successfully created.',
      clientId: clientId,
    };
  }

  @UseGuards(VerifyUserTokenGuard)
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

  @UseGuards(VerifyUserTokenGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.clientsService.delete(id);
    return {
      message: 'Client successfully deleted.',
    };
  }
}
