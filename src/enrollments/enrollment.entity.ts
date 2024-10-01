import { Client } from '../clients/client.entity';
import { Customer } from '../customers/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EnrollmentType } from './enums/enrollment.enum';

@Entity({ name: 'enrollments' })
export class Enrollment {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => Client, (client) => client.enrollments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'enrollment', enum: EnrollmentType })
  enrollment: EnrollmentType;

  @Column({ name: 'monthly_fee', type: 'float' })
  monthlyFee: number;

  @OneToMany(() => Customer, (customer) => customer.enrollment)
  customers: Customer[];
}
