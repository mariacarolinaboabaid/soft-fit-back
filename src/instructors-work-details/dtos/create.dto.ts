import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateInstructorWorkDetailsDTO {
  @Type(() => Date)
  @IsDate({ message: 'Hire date must be a valid date.' })
  @IsNotEmpty({ message: 'Hire date must have a value.' })
  hireDate: Date;

  @IsNumber({}, { message: 'Salary must be a number.' })
  @IsNotEmpty({ message: 'Salary must have a value.' })
  salary: number;

  @Type(() => Date)
  @IsDate({ message: 'Due date must be a valid date.' })
  @IsNotEmpty({ message: 'Due date must have a value.' })
  dueDate: Date;

  @IsString({ message: 'Bank for payment must be a string.' })
  @IsNotEmpty({ message: 'Bank for payment must have a value.' })
  bankPayment: string;

  @IsString({ message: 'Account for payment must be a string.' })
  @IsNotEmpty({ message: 'Account for payment must have a value.' })
  accountPayment: string;

  @IsNumber({}, { message: 'Work hours must be a number.' })
  @IsNotEmpty({ message: 'Work hours must have a value.' })
  workHours: number;

  @IsNumber({}, { message: 'Hour start time must be a number.' })
  @IsNotEmpty({ message: 'Hour start time must have a value.' })
  hourStartTime: number;

  @IsNumber({}, { message: 'Minute start time must be a number.' })
  @IsNotEmpty({ message: 'Minute start time must have a value.' })
  minuteStartTime: number;

  @IsNumber({}, { message: 'Hour end time must be a number.' })
  @IsNotEmpty({ message: 'Hour end time must have a value.' })
  hourEndTime: number;

  @IsNumber({}, { message: 'Minute end time must be a number.' })
  @IsNotEmpty({ message: 'Minute end time must have a value.' })
  minuteEndTime: number;
}
