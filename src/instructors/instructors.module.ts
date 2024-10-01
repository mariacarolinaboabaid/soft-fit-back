import { forwardRef, Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './instructor.entity';
import { SharedModule } from 'src/shared/shared.module';
import { HashPasswordService } from 'src/shared/services/hash-password/hash-password.service';
import { IsUsernameUniqueValidator } from 'src/shared/validators/is-username-unique/is-username-unique';
import { Repository } from 'typeorm';
import { ClientsModule } from 'src/clients/clients.module';
import { ClientsService } from 'src/clients/clients.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instructor]),
    forwardRef(() => SharedModule),
    forwardRef(() => ClientsModule),
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
        hashPasswordService: HashPasswordService,
      ) =>
        new InstructorsService(
          instructorsRepository,
          clientsService,
          hashPasswordService,
        ),

      inject: [getRepositoryToken(Instructor)],
    },
  ],
})
export class InstructorsModule {}
