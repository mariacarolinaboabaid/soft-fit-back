import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUsernameUnique } from 'src/shared/validators/is-username-unique/is-username-unique';

export class CreateInstructorDTO {
  @IsString({ message: 'Client id must be a string.' })
  @IsNotEmpty({ message: 'Client id must have a value.' })
  clientId: string;

  @IsString({ message: 'First name must be a string.' })
  @IsNotEmpty({ message: 'First name must have a value.' })
  firstName: string;

  @IsString({ message: 'Last name must be a string.' })
  @IsNotEmpty({ message: 'Last name must have a value.' })
  lastName: string;

  @IsEmail({}, { message: 'Username must be an email.' })
  @IsUsernameUnique('INSTRUCTORS_SERVICE', 'getByUsername', {})
  username: string;

  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password must have a value.' })
  password: string;

  @Type(() => Date)
  @IsDate({ message: 'Birth date must be a valid date.' })
  @IsNotEmpty({ message: 'Birth date must have a value.' })
  birthDate: Date;

  @IsString({ message: 'Fiscal number must be a string.' })
  @IsNotEmpty({ message: 'Fiscal number must have a value.' })
  fiscalNumber: string;

  @IsString({ message: 'Phone must be a string.' })
  @IsNotEmpty({ message: 'Phone must have a value.' })
  phone: string;

  @IsString({ message: 'Work details id must be a string.' })
  @IsNotEmpty({ message: 'Work details id must have a value.' })
  workDetailsId: string;
}
