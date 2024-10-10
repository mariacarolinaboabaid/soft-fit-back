import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO } from './dtos/create.dto';
import { UpdateCustomerDTO } from './dtos/update.dto';
import { VerifyUserTokenGuard } from 'src/authentication/guards/verify-user-token/verify-user-token.guard';
import { UserPayload } from 'src/authentication/interfaces/user-payload.interface';

@UseGuards(VerifyUserTokenGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getAll() {
    const customers = await this.customersService.getAll();
    return customers;
  }

  @Get('/customers-by-client-id/:clientId')
  async getAllByClientId(@Param('clientId') clientId: string) {
    const customers = await this.customersService.getAllByClientId(clientId);
    return customers;
  }

  @Get('/deliquents-customers-by-client-id')
  async getDeliquentsCustomersByClientId(@Req() request: UserPayload) {
    const clientId = request.sub;
    const customers =
      await this.customersService.getDeliquentsCustomersByClientId(clientId);
    return customers;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const customer = await this.customersService.getById(id);
    return customer;
  }

  @Post()
  async create(@Body() createCustomerDTO: CreateCustomerDTO) {
    const customerId = await this.customersService.create(createCustomerDTO);
    return {
      message: 'Customer successfully created.',
      customerId: customerId,
    };
  }

  @Put('update-active-status/:id')
  async updatePropertyActive(@Param('id') id: string) {
    await this.customersService.updatePropertyActive(id);
    return {
      message: 'Customer successfully updated.',
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
