import { Instructor } from '../instructors/instructor.entity';
import { Payment } from '../shared/interfaces/payments/payment.interface';
import { SalaryHistory } from './interfaces/salary-history.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'instructors_work_details' })
export class InstructorWorkDetails {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @OneToOne(() => Instructor, (instructor) => instructor.workDetails, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;

  @Column({ name: 'hire_date', type: 'date' })
  hireDate: Date;

  @Column({ name: 'salary', type: 'float' })
  salary: number;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @Column({ name: 'bank_payment', type: 'varchar' })
  bankPayment: string;

  @Column({ name: 'account_payment', type: 'varchar' })
  accountPayment: string;

  @Column({ name: 'work_hours', type: 'float' })
  workHours: number;

  @Column({ name: 'hour_start_time', type: 'int' })
  hourStartTime: number;

  @Column({ name: 'minute_start_time', type: 'int' })
  minuteStartTime: number;

  @Column({ name: 'hour_end_time', type: 'int' })
  hourEndTime: number;

  @Column({ name: 'minute_end_time', type: 'int' })
  minuteEndTime: number;

  @Column({ name: 'payments', type: 'jsonb', nullable: true })
  payments: Payment[];

  @Column({ name: 'salary_history', type: 'jsonb', nullable: true })
  salaryHistory: SalaryHistory[];
}
