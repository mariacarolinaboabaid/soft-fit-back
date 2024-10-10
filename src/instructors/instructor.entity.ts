import { Client } from '../clients/client.entity';
import { InstructorWorkDetails } from '../instructors-work-details/instructor-work-details.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'instructors' })
export class Instructor {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => Client, (client) => client.instructors, {
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

  @Column({ name: 'enrollment_number', type: 'varchar', unique: true })
  enrollmentNumber: string;

  @OneToOne(
    () => InstructorWorkDetails,
    (workDetails) => workDetails.instructor,
  )
  workDetails: InstructorWorkDetails;

  @Column({ name: 'active', type: 'boolean' })
  active: boolean;

  @Column({ name: 'set_inactive_on_date', type: 'date', nullable: true })
  inactiveDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
