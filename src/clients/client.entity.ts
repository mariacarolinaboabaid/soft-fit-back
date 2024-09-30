/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from './enums/currency.enum';
import { Role } from '../shared/enums/role.enum';
import { ClientStatistics } from '../clients-statistics/client-statistics.entity';

@Entity({ name: 'clients' })
export class Client {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: "business_name", type: "varchar", unique: true })
  businessName: string;

  @Column({ name: "fiscal_number", type: "varchar", unique: true })
  fiscalNumber: string;

  @Column({ name: "username", type: "varchar", unique: true })
  username: string;

  @Column({ name: "password", type: "varchar" })
  password: string;

  @Column({ name: "role", enum: Role, nullable: false })
  role: Role;

  @Column({ name: "currency", enum: Currency, nullable: false })
  currency: Currency;

  @OneToOne(() => ClientStatistics, statistics => statistics.client,
  {cascade: true, onDelete: 'CASCADE'})
  @JoinColumn({name: "statistics_id"})
  statistics: ClientStatistics;
}
