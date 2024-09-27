/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from './enums/currency.enum';
import { Role } from '../shared/enums/role.enum';

@Entity({ name: 'clients' })
export class Client {

 @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: "businessName", type: "varchar", unique: true })
  businessName: string;

  @Column({ name: "fiscalNumber", type: "varchar", unique: true })
  fiscalNumber: string;

  @Column({ name: "username", type: "varchar", unique: true })
  username: string;

  @Column({ name: "password", type: "varchar" })
  password: string;

  @Column({ name: "role", enum: Role, nullable: false })
  role: Role;

  @Column({ name: "currency", enum: Currency, nullable: false })
  currency: Currency;
}
