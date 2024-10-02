import { forwardRef, Module } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { Instructor } from './instructor.entity';
import { IsUsernameUniqueValidator } from 'src/shared/validators/is-username-unique/is-username-unique';
import { HashPasswordService } from 'src/shared/services/hash-password/hash-password.service';
import { ClientsModule } from 'src/clients/clients.module';
import { ClientsService } from 'src/clients/clients.service';
import { SharedModule } from 'src/shared/shared.module';
import { InstructorsWorkDetailsModule } from 'src/instructors-work-details/instructors-work-details.module';
import { InstructorsWorkDetailsService } from 'src/instructors-work-details/instructors-work-details.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instructor]),
    forwardRef(() => SharedModule),
    forwardRef(() => ClientsModule),
    forwardRef(() => InstructorsWorkDetailsModule),
  ],
  controllers: [InstructorsController],
  providers: [
    InstructorsService,
    IsUsernameUniqueValidator,
    HashPasswordService,
    {
      provide: 'INSTRUCTORS_SERVICE',
      useFactory: (
        instructorsRepository: Repository<Instructor>,
        clientsService: ClientsService,
        instructorsWorkDetailsService: InstructorsWorkDetailsService,
        hashPasswordService: HashPasswordService,
      ) =>
        new InstructorsService(
          instructorsRepository,
          clientsService,
          instructorsWorkDetailsService,
          hashPasswordService,
        ),

      inject: [getRepositoryToken(Instructor)],
    },
  ],
})
export class InstructorsModule {}
