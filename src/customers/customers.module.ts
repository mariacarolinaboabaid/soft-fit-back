import { forwardRef, Module } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Repository } from 'typeorm';
import { HashPasswordService } from 'src/shared/services/hash-password/hash-password.service';
import { IsUsernameUniqueValidator } from 'src/shared/validators/is-username-unique/is-username-unique';
import { ClientsModule } from 'src/clients/clients.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { ClientsService } from 'src/clients/clients.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    forwardRef(() => SharedModule),
    forwardRef(() => ClientsModule),
    forwardRef(() => EnrollmentsModule),
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    IsUsernameUniqueValidator,
    HashPasswordService,
    {
      provide: 'CUSTOMERS_SERVICE',
      useFactory: (
        customersRepository: Repository<Customer>,
        hashPasswordService: HashPasswordService,
        clientsService: ClientsService,
        enrollmentsService: EnrollmentsService,
      ) =>
        new CustomersService(
          customersRepository,
          hashPasswordService,
          clientsService,
          enrollmentsService,
        ),

      inject: [getRepositoryToken(Customer)],
    },
  ],
})
export class CustomersModule {}
