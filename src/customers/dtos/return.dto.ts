export class ReturnCustomerDTO {
  constructor(
    readonly id: string,
    readonly clientId: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly username: string,
    readonly password: string,
  ) {}
}
