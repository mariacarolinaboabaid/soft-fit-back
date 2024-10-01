import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import dataSource from './database/postgres-config/postgres-config';
import { DatabaseService } from './database/services/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsStatisticsModule } from './clients-statistics/clients-statistics.module';
import { CustomersModule } from './customers/customers.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { InstructorsModule } from './instructors/instructors.module';
import { InstructorsWorkDetailsModule } from './instructors-work-details/instructors-work-details.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      inject: [DatabaseService],
    }),
    ClientsModule,
    ClientsStatisticsModule,
    CustomersModule,
    EnrollmentsModule,
    InstructorsModule,
    InstructorsWorkDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  async onModuleInit() {
    try {
      await dataSource.initialize();
      console.log('Connection with database has been initialized!');
    } catch (err) {
      console.error('Error during the connection with database!', err);
    }
  }
}
