import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EnrollmentType } from '../enums/enrollment.enum';

export class CreateEnrollmentDTO {
  @IsString({ message: 'Client id must be a string.' })
  @IsNotEmpty({ message: 'Client id must have a value.' })
  clientId: string;

  @IsEnum(EnrollmentType, {
    message: () => {
      const enumValues = Object.values(EnrollmentType).join(', ');
      return `Enrollment must be a valid enum value. Possible values: ${enumValues}.`;
    },
  })
  @IsNotEmpty({ message: 'Enrollment must have a value.' })
  enrollment: EnrollmentType;

  @IsNotEmpty({ message: 'Monthly fee  must have a value.' })
  @IsNumber({}, { message: 'Monthly fee must be a number.' })
  monthlyFee: number;
}
