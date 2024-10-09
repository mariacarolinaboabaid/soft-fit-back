import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientsService } from 'src/clients/clients.service';
import { CustomersService } from 'src/customers/customers.service';
import { InstructorsService } from 'src/instructors/instructors.service';
import { UserAuthenticationDTO } from './dtos/user-authentication.dto';
import { UserPayload } from './interfaces/user-payload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly customersService: CustomersService,
    private readonly instructorsService: InstructorsService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(
    userAuthenticationDTO: UserAuthenticationDTO,
    isClient: boolean,
    isCustomer: boolean,
    isInstructor: boolean,
  ) {
    const username = userAuthenticationDTO.username;
    let user;
    if (isClient) {
      user = await this.clientsService.getByUsername(username);
    } else if (isCustomer) {
      user = await this.customersService.getByUsername(username);
    } else if (isInstructor) {
      user = await this.instructorsService.getByUsername(username);
    }
    if (!user) {
      throw new NotFoundException(
        'Not found any user registered by this username.',
      );
    }
    const password = userAuthenticationDTO.password;
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Incorrect password.');
    }
    const userDisplayName = isClient
      ? user.businessName
      : user.firstName + ' ' + user.lastName;
    const payload: UserPayload = {
      sub: user.id,
      name: userDisplayName,
    };
    const token = await this.jwtService.signAsync(payload);
    return { accessToken: token, name: userDisplayName };
  }
}
