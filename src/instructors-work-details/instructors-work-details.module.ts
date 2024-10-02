import { Module } from '@nestjs/common';
import { InstructorsWorkDetailsService } from './instructors-work-details.service';
import { InstructorsWorkDetailsController } from './instructors-work-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorWorkDetails } from './instructor-work-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstructorWorkDetails])],
  controllers: [InstructorsWorkDetailsController],
  providers: [InstructorsWorkDetailsService],
  exports: [InstructorsWorkDetailsService],
})
export class InstructorsWorkDetailsModule {}
