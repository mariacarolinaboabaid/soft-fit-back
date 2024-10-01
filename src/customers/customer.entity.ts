import { Client } from '../clients/client.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from './interfaces/payment.interface';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => Client, (client) => client.customers, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'username', type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ name: 'fiscal_number', type: 'varchar', unique: true })
  fiscalNumber: string;

  @Column({ name: 'phone', type: 'varchar', unique: true })
  phone: string;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.customers, {
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;

  @Column({ name: 'card_number', type: 'varchar', unique: true })
  cardNumber: string;

  @Column({ name: 'card_expiration_date', type: 'varchar' })
  cardExpirationDate: string;

  @Column({ name: 'card_safe_code', type: 'varchar' })
  cardSafeCode: string;

  @Column({ name: 'card_name', type: 'varchar' })
  cardName: string;

  @Column({ name: 'card_owner_fiscal_number', type: 'varchar' })
  cardOwnerFiscalNumber: string;

  @Column({ name: 'due_date', type: 'varchar' })
  dueDate: string;

  @Column({ name: 'payments', type: 'jsonb', nullable: true })
  payments: Payment[];

  @Column({ name: 'active', type: 'boolean' })
  active: boolean;

  @Column({ name: 'deliquent', type: 'boolean' })
  deliquent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
