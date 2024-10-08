import { Currency } from '../../shared/enums/currency/currency.enum';

export class ReturnClientDTO {
  constructor(
    readonly businessName: string,
    readonly fiscalNumber: string,
    readonly username: string,
    readonly currency: Currency,
    readonly statisticsId: string,
  ) { }
}
