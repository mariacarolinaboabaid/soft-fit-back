import { Controller } from '@nestjs/common';
import { InstructorsWorkDetailsService } from './instructors-work-details.service';

@Controller('instructors-work-details')
export class InstructorsWorkDetailsController {
  constructor(
    private readonly instructorsWorkDetailsService: InstructorsWorkDetailsService,
  ) {}
}
