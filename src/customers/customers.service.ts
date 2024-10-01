/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuid } from 'uuid';
import { Customer } from './customer.entity';
import { CreateCustomerDTO } from './dtos/create-customer.dto';
import { ReturnCustomerAuthDTO } from './dtos/return-customer-auth.dto';
import { HashPasswordService } from 'src/shared/services/hash-password/hash-password.service';
import { UpdateCustomerDTO } from './dtos/update-customer.dto';
import { CreatePaymentDTO } from './dtos/create-payment.dto';
import { Payment } from './interfaces/payment.interface';
import { ClientsService } from 'src/clients/clients.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';


@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
    private readonly hashPasswordService: HashPasswordService,
    private readonly clientsService: ClientsService,
    private readonly enrollmentsService: EnrollmentsService
  ) { }

  async getAll() {
    const customers = await this.customersRepository.find({
      relations: ['client'],
    });
    const customersAuthDTO = customers.map(
      (customer) =>
        new ReturnCustomerAuthDTO(
          customer.id,
          customer.client.id,
          customer.firstName,
          customer.lastName,
          customer.username,
          customer.password,
        ),
    );
    return customersAuthDTO;
  }

  async getById(id: string) {
    const customer = await this.customersRepository.findOne({
      where: { id: id },
      relations: ['client', 'enrollment'],
    });
    if (customer === null) {
      throw new NotFoundException(
        'Not found any customer registered by this id.',
      );
    }
    return customer;
  }

  async getByUsername(username: string) {
    const customer = await this.customersRepository.findOne({
      where: { username: username },
    });
    return customer;
  }

  async getAllByClientId(clientId: string) {
    const customers = await this.customersRepository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'enrollment'],
    });
    if (customers === null) {
      throw new NotFoundException(
        'Not found any customers registered by this client id.',
      );
    }
    return customers;
  }

  async getAllCountCustomersByClientId(clientId: string) {
    const count = await this.customersRepository.count({
      where: { client: { id: clientId } },
    });
    return count;
  }

  async getAllCountActiveCustomersByClientId(clientId: string) {
    const count = await this.customersRepository.count({
      where: {
        client: { id: clientId },
        active: true,
      },
    });
    return count;
  }

  async getCountInactiveCustomersByClientId(clientId: string) {
    const count = await this.customersRepository.count({
      where: {
        client: { id: clientId },
        active: false,
      },
    });
    return count;
  }

  async getCountCustomersByEnrollmentAndClientId(
    clientId: string,
    enrollmentId: string,
  ) {
    const count = await this.customersRepository.count({
      where: {
        client: { id: clientId },
        enrollment: { id: enrollmentId },
      },
    });
    return count;
  }

  async getCountCustomersDeliquentsByClientId(clientId: string) {
    const count = await this.customersRepository.count({
      where: {
        client: { id: clientId },
        deliquent: true,
      },
    });
    return count;
  }

  async getDeliquentsCustomersByClientId(clientId: string) {
    const customers = await this.customersRepository.find({
      where: {
        client: { id: clientId },
        deliquent: true,
      },
    });
    return customers;
  }

  async create(createCustomerDTO: CreateCustomerDTO) {
    const customer = new Customer();
    Object.assign(customer, createCustomerDTO);
    customer.id = uuid();
    customer.active = true;
    customer.deliquent = false;
    customer.payments = [];
    customer.client = await this.getClientInformation(createCustomerDTO.clientId);
    customer.enrollment = await this.enrollmentsService.getById(createCustomerDTO.enrollmentId);
    customer.password = await this.hashPasswordService.hashPassword(createCustomerDTO.password,);
    await this.customersRepository.save(customer);
    return customer.id;
  }

  private async getClientInformation(clientId: string){
    return await this.clientsService.getByIdWithAllInformation(clientId);
  }

  async createPayment(id: string, createPaymentDTO: CreatePaymentDTO) {
    const customer = await this.getById(id);
    if (customer) {
      const payment = {} as Payment;
      payment.id = uuid();
      payment.paid = false;
      customer.payments.push(payment);
      Object.assign(payment, createPaymentDTO);
      await this.customersRepository.save(customer);
    }
  }

  async update(id: string, updateCustomerDTO: UpdateCustomerDTO) {
    const customer = await this.getById(id);
    if (customer) {
      await this.customersRepository.update(id, updateCustomerDTO);
    }
  }

  async updatePayment(id: string, paymentId: string) {
    const customer = await this.getById(id);
    if (customer) {
      const payments = customer.payments;
      const selectedPayment = payments.find(payment => payment.id === paymentId);
      selectedPayment.paid = !selectedPayment.paid;
      await this.customersRepository.save(customer);
    }
  }

  async delete(id: string) {
    const customer = await this.getById(id);
    if (customer) {
      await this.customersRepository.delete(id);
    }
  }
}
