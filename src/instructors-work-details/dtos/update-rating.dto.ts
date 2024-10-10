import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateInstructorsWorkDetailsRatingDTO {
  @IsNotEmpty({ message: 'Rating value must have a value.' })
  @IsNumber({}, { message: 'Rating value must be a number.' })
  ratingValue: number;
}
