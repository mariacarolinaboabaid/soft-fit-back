/* eslint-disable prettier/prettier */
import { Role } from "src/shared/enums/role.enum";
import { Currency } from "../enums/currency.enum";

export class ReturnClientDTO {
    constructor(
        readonly businessName: string,
        readonly fiscalNumber: string,
        readonly username: string,
        readonly role: Role,
        readonly currency: Currency
    ){}
}