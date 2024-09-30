import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClientStatisticsDTO {
  constructor(clientId: string) {
    this.clientId = clientId;
    this.totalCustomers = 0;
    this.totalDeliquentCustomers = 0;
    this.totalDeliquencyAmount = 0;
    this.totalRenewedEnrollments = 0;
    this.totalNewEnrollments = 0;
    this.totalCanceledEnrollments = 0;
    this.totalPremiumEnrollments = 0;
    this.totalBasicEnrollments = 0;
  }

  @IsNotEmpty({ message: 'ClientId must have a value.' })
  @IsString({ message: 'ClientId must be a string.' })
  clientId: string;

  @IsNotEmpty({ message: 'Total customers must have a value.' })
  @IsNumber({}, { message: 'Total customers must be a number.' })
  totalCustomers: number;

  @IsNotEmpty({ message: 'Total delinquent customers must have a value.' })
  @IsNumber({}, { message: 'Total delinquent customers must be a number.' })
  totalDeliquentCustomers: number;

  @IsNotEmpty({ message: 'Total delinquency amount must have a value.' })
  @IsNumber({}, { message: 'Total delinquency amount must be a number.' })
  totalDeliquencyAmount: number;

  @IsNotEmpty({ message: 'Total renewed enrollments must have a value.' })
  @IsNumber({}, { message: 'Total renewed enrollments must be a number.' })
  totalRenewedEnrollments: number;

  @IsNotEmpty({ message: 'Total new enrollments must have a value.' })
  @IsNumber({}, { message: 'Total new enrollments must be a number.' })
  totalNewEnrollments: number;

  @IsNotEmpty({ message: 'Total canceled enrollment must have a value.' })
  @IsNumber({}, { message: 'Total canceled enrollment must be a number.' })
  totalCanceledEnrollments: number;

  @IsNotEmpty({ message: 'Total premium enrollments must have a value.' })
  @IsNumber({}, { message: 'Total premium enrollments must be a number.' })
  totalPremiumEnrollments: number;

  @IsNotEmpty({ message: 'Total basic enrollments must have a value.' })
  @IsNumber({}, { message: 'Total basic enrollments must be a number.' })
  totalBasicEnrollments: number;
}
