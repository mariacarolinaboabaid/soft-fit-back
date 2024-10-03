import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDTO } from './dtos/create.dto';
import { UpdateEnrollmentDTO } from './dtos/update.dto';
import { VerifyUserTokenGuard } from 'src/authentication/guards/verify-user-token/verify-user-token.guard';

@UseGuards(VerifyUserTokenGuard)
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const enrollment = await this.enrollmentsService.getById(id);
    return enrollment;
  }

  @Get('/filter-by-client-id/:clientId')
  async getByClientId(@Param('clientId') clientId: string) {
    const enrollment = await this.enrollmentsService.getByClientId(clientId);
    return enrollment;
  }

  @Post()
  async create(@Body() createEnrollmentDTO: CreateEnrollmentDTO) {
    const response = await this.enrollmentsService.create(createEnrollmentDTO);
    return {
      message: 'Enrollment successfully created.',
      enrollmentId: response,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateEnrollmentDTO: UpdateEnrollmentDTO,
  ) {
    await this.enrollmentsService.update(id, updateEnrollmentDTO);
    return {
      message: 'Enrollment successfully updated.',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.enrollmentsService.delete(id);
    return {
      message: 'Enrollment successfully deleted.',
    };
  }
}
