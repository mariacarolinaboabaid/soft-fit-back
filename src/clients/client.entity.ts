import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Currency } from './enums/currency.enum';
import { ClientStatistics } from '../clients-statistics/client-statistics.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { Customer } from '../customers/customer.entity';
import { Instructor } from '../instructors/instructor.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'business_name', type: 'varchar', unique: true })
  businessName: string;

  @Column({ name: 'fiscal_number', type: 'varchar', unique: true })
  fiscalNumber: string;

  @Column({ name: 'username', type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'currency', enum: Currency, nullable: false })
  currency: Currency;

  @OneToOne(() => ClientStatistics, (statistics) => statistics.client, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'statistics_id' })
  statistics: ClientStatistics;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.client)
  enrollments: Enrollment[];

  @OneToMany(() => Instructor, (instructor) => instructor.client)
  instructors: Instructor[];

  @OneToMany(() => Customer, (customer) => customer.client)
  customers: Customer[];
}
