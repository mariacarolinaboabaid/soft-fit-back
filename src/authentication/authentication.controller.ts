import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserAuthenticationDTO } from './dtos/user-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/clients')
  async authenticateUserClient(
    @Body() userAuthenticationDTO: UserAuthenticationDTO,
  ) {
    return await this.authenticationService.authenticateUser(
      userAuthenticationDTO,
      true,
      false,
      false,
    );
  }

  @Post('/customers')
  async authenticateUserCustomer(
    @Body() userAuthenticationDTO: UserAuthenticationDTO,
  ) {
    return await this.authenticationService.authenticateUser(
      userAuthenticationDTO,
      false,
      true,
      false,
    );
  }

  @Post('/instructors')
  async authenticateUserInstructor(
    @Body() userAuthenticationDTO: UserAuthenticationDTO,
  ) {
    return await this.authenticationService.authenticateUser(
      userAuthenticationDTO,
      false,
      false,
      true,
    );
  }
}
