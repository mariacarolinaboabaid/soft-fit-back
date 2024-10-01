import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreatePaymentDTO {
  @IsNumber({}, { message: 'Value must have a number.' })
  @IsNotEmpty({ message: 'Value must have a value.' })
  value: number;

  @IsString({ message: 'Due date must have a string.' })
  @IsNotEmpty({ message: 'Due date must have a value.' })
  dueDate: string;
}
