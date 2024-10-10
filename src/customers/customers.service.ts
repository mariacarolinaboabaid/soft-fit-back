/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuid } from 'uuid';
import { Customer } from './customer.entity';
import { CreateCustomerDTO } from './dtos/create.dto';
import { ReturnCustomerDTO } from './dtos/return.dto';
import { HashPasswordService } from 'src/shared/services/hash-password/hash-password.service';
import { UpdateCustomerDTO } from './dtos/update.dto';
import { CreatePaymentDTO } from '../shared/dtos/payments/create-payment.dto';
import { Payment } from '../shared/interfaces/payments/payment.interface';
import { ClientsService } from 'src/clients/clients.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { ReturnCustomerDeliquentDTO } from './dtos/return-deliquents.dto';
import { console } from 'inspector';


@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
    private readonly clientsService: ClientsService,
    private readonly enrollmentsService: EnrollmentsService,
    private readonly hashPasswordService: HashPasswordService,
  ) { }

  async getAll() {
    const customers = await this.repository.find({ relations: ['client'], });
    const customersAuthDTO = customers.map(
      (customer) =>
        new ReturnCustomerDTO(
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
    const customer = await this.repository.findOne({
      where: { id: id },
      relations: ['client', 'enrollment'],
    });
    if (!customer) {
      throw new NotFoundException(
        'Not found any customer registered by this id.',
      );
    }
    return customer;
  }

  async getByUsername(username: string) {
    const customer = await this.repository.findOne({
      where: { username: username },
    });
    return customer;
  }

  async getAllByClientId(clientId: string) {
    const customers = await this.repository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'enrollment'],
    });
    if (!customers) {
      throw new NotFoundException(
        'Not found any customers registered by this client id.',
      );
    }
    return customers;
  }

  async getCountTotalCustomersByClientId(clientId: string) {
    const count = await this.repository.count({
      where: { client: { id: clientId } },
    });
    return count;
  }

  async getCountActiveCustomersByClientId(clientId: string) {
    const count = await this.repository.count({
      where: {
        client: { id: clientId },
        active: true,
      },
    });
    return count;
  }

  async getCountInactiveCustomersByClientId(clientId: string) {
    const count = await this.repository.count({
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
    const count = await this.repository.count({
      where: {
        client: { id: clientId },
        enrollment: { id: enrollmentId },
      },
    });
    return count;
  }

  async getCountCustomersDeliquentsByClientId(clientId: string) {
    const count = await this.repository.count({
      where: {
        client: { id: clientId },
        deliquent: true,
      },
    });
    return count;
  }

  async getDeliquentsCustomersByClientId(clientId: string) {
    const customers = await this.repository.find({
      where: {
        client: { id: clientId },
        deliquent: true,
      },
    });
    const customersDTO = customers.map(customer => {
      const fullName = customer.firstName + ' ' + customer.lastName;
      return new ReturnCustomerDeliquentDTO(customer.id, fullName)
    })
    console.log(customersDTO)
    return customersDTO;
  }

  async create(createCustomerDTO: CreateCustomerDTO) {
    const clientInformation = await this.getClientInformation(createCustomerDTO.clientId);
    const customer = new Customer();
    Object.assign(customer, createCustomerDTO);
    customer.id = uuid();
    customer.active = true;
    customer.deliquent = false;
    customer.payments = [];
    customer.client = clientInformation;
    customer.currency = clientInformation.currency;
    customer.enrollment = await this.enrollmentsService.getById(createCustomerDTO.enrollmentId);
    customer.enrollmentNumber = await this.generateEnrollmentNumber(clientInformation.id);
    customer.password = await this.hashPasswordService.hashPassword(createCustomerDTO.password,);
    await this.repository.save(customer);
    return customer.id;
  }

  private async getClientInformation(clientId: string) {
    return await this.clientsService.getByIdWithAllInformation(clientId);
  }

  private async generateEnrollmentNumber(clientId: string){
    const totalCustomersClient = await this.getCountTotalCustomersByClientId(clientId);
    const enrollmentNumber = totalCustomersClient + 1;
    return enrollmentNumber.toString();
  } 

  async createPayment(id: string, createPaymentDTO: CreatePaymentDTO) {
    const customer = await this.getById(id);
    if (customer) {
      const payment = {} as Payment;
      payment.id = uuid();
      payment.paid = false;
      customer.payments.push(payment);
      Object.assign(payment, createPaymentDTO);
      await this.repository.save(customer);
    }
  }

  async update(id: string, updateCustomerDTO: UpdateCustomerDTO) {
    const customer = await this.getById(id);
    if (customer) {
      await this.repository.update(id, updateCustomerDTO);
    }
  }

  async updatePropertyActive(id: string){
    const customer = await this.getById(id);
    if (customer) {
      customer.active = !customer.active;
      if (customer.active){
        customer.inactiveDate = null;
      } else {
        const today = new Date();
        customer.inactiveDate = today;
      }
      await this.repository.update(id, customer);
    }
  }

  async updatePayment(id: string, paymentId: string) {
    const customer = await this.getById(id);
    if (customer) {
      const payments = customer.payments;
      const selectedPayment = payments.find(payment => payment.id === paymentId);
      selectedPayment.paid = !selectedPayment.paid;
      await this.repository.save(customer);
    }
  }

  async delete(id: string) {
    const customer = await this.getById(id);
    if (customer) {
      await this.repository.delete(id);
    }
  }
}
