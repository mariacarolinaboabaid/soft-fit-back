import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import dataSource from './database/postgres-config/postgres-config';

@Module({
  imports: [ConfigModule.forRoot()],
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
