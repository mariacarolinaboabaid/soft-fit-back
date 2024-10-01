import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO } from './dtos/create-customer.dto';
import { UpdateCustomerDTO } from './dtos/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getAll() {
    const customers = await this.customersService.getAll();
    return customers;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const customer = await this.customersService.getById(id);
    return customer;
  }

  @Get('/customer-by-username/:username')
  async getByUsername(@Param('username') username: string) {
    const customer = await this.customersService.getByUsername(username);
    return customer;
  }

  @Get('/customers-by-client-id/:clientId')
  async getAllByClientId(@Param('clientId') clientId: string) {
    const customers = await this.customersService.getAllByClientId(clientId);
    return customers;
  }

  @Get('/deliquents-customers-by-client-id/:clientId')
  async getDeliquentsCustomersByClientId(@Param('clientId') clientId: string) {
    const customers =
      await this.customersService.getDeliquentsCustomersByClientId(clientId);
    return customers;
  }

  @Post()
  async create(@Body() createCustomerDTO: CreateCustomerDTO) {
    const response = await this.customersService.create(createCustomerDTO);
    return {
      message: 'Customer successfully created.',
      customerId: response,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDTO: UpdateCustomerDTO,
  ) {
    await this.customersService.update(id, updateCustomerDTO);
    return {
      message: 'Customer successfully updated.',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.customersService.delete(id);
    return {
      message: 'Customer successfully deleted.',
    };
  }
}
