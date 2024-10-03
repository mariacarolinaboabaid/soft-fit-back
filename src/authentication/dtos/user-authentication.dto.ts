import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthenticationDTO {
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: 'Username must have a value.' })
  username: string;

  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password must have a value.' })
  password: string;
}
