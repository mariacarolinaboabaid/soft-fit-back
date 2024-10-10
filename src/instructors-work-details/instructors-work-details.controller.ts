import { Body, Controller, Param, Put } from '@nestjs/common';
import { InstructorsWorkDetailsService } from './instructors-work-details.service';
import { UpdateInstructorsWorkDetailsRatingDTO } from './dtos/update-rating.dto';

@Controller('instructors-work-details')
export class InstructorsWorkDetailsController {
  constructor(
    private readonly instructorsWorkDetailsService: InstructorsWorkDetailsService,
  ) {}

  @Put('/:instructorId')
  async updateRating(
    @Param('instructorId') instructorId: string,
    @Body() updateRatingDTO: UpdateInstructorsWorkDetailsRatingDTO,
  ) {
    await this.instructorsWorkDetailsService.updateRating(
      instructorId,
      updateRatingDTO,
    );
    return {
      message: 'Rating value successfully updated!',
    };
  }
}
