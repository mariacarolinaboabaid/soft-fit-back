import { InstructorsService } from './instructors.service';
import { CreateInstructorDTO } from './dtos/create.dto';
import { UpdateInstructorDTO } from './dtos/update.dto';
import { VerifyUserTokenGuard } from 'src/authentication/guards/verify-user-token/verify-user-token.guard';
import { UserPayload } from 'src/authentication/interfaces/user-payload.interface';
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

@UseGuards(VerifyUserTokenGuard)
@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Get()
  async getAll() {
    const instructors = await this.instructorsService.getAll();
    return instructors;
  }

  @Get('/instructors-by-client-id/:clientId')
  async getByClientId(@Param('clientId') clientId: string) {
    const instructors = await this.instructorsService.getByClientId(clientId);
    return instructors;
  }

  @Get('/top-five-rate-instructors-by-client-id')
  async getBestRatedInstructorsByClientId(@Req() request: UserPayload) {
    const clientId = request.sub;
    const instructors =
      await this.instructorsService.getBestRatedInstructorsByClientId(clientId);
    return instructors;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const instructor = await this.instructorsService.getById(id);
    return instructor;
  }

  @Post()
  async create(@Body() createInstructorDTO: CreateInstructorDTO) {
    const instructorId =
      await this.instructorsService.create(createInstructorDTO);
    return {
      message: 'Instructor successfully created.',
      instructorId: instructorId,
    };
  }

  @Put('update-active-status/:id')
  async updatePropertyActive(@Param('id') id: string) {
    await this.instructorsService.updatePropertyActive(id);
    return {
      message: 'Instructor successfully created.',
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateInstructorDTO: UpdateInstructorDTO,
  ) {
    await this.instructorsService.update(id, updateInstructorDTO);
    return {
      message: 'Instructor successfully updated.',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.instructorsService.delete(id);
    return {
      message: 'Instructor successfully deleted.',
    };
  }
}
