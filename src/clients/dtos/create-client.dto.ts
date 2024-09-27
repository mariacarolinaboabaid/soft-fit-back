/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/shared/enums/role.enum";
import { Currency } from "../enums/currency.enum";
import { IsUsernameUnique } from "src/shared/validators/is-username-unique/is-username-unique";


export class CreateClientDTO {

@IsString({ message: "Business name must be a string."})
@IsNotEmpty({message: "Business name must have a value."})
businessName: string;

@IsString({ message: "Fiscal number must be a string."})
@IsNotEmpty({message: "Fiscal number must have a value."})
fiscalNumber: string;

@IsEmail({},{ message: "Username must be an email."})
@IsUsernameUnique('CLIENTS_SERVICE', 'getByUsername', {})
username: string;

@IsString({ message: "Password must be a string."})
@IsNotEmpty({message: "Password must have a value."})
password: string;

@IsEnum(Role, { message: "Role must be a valid enum value." })
@IsNotEmpty({ message: "Role must have a value." })
role: Role;

@IsEnum(Currency, { message: "Currency must be a valid enum value." })
@IsNotEmpty({ message: "Currency must have a value." })
currency: Currency;
}