import { IsNotEmpty } from 'class-validator';

export class CreateDTO {
  @IsNotEmpty({ message: 'Total customers must have a value.' })
  totalCustomers: number;

  @IsNotEmpty({ message: 'Total deliquent customers must have a value.' })
  totalDeliquentCustomers: number;

  @IsNotEmpty({ message: 'Total delinquency amount must have a value.' })
  totalDeliquencyAmount: number;

  @IsNotEmpty({ message: 'Total renewed enrollments must have a value.' })
  totalRenewedEnrollments: number;

  @IsNotEmpty({ message: 'Total new enrollments must have a value.' })
  totalNewEnrollments: number;

  @IsNotEmpty({ message: 'Total canceled enrollment must have a value.' })
  totalCanceledEnrollments: number;

  @IsNotEmpty({ message: 'Total premium enrollments must have a value.' })
  totalPremiumEnrollments: number;

  @IsNotEmpty({ message: 'Total basic enrollments must have a value.' })
  totalBasicEnrollments: number;
}
