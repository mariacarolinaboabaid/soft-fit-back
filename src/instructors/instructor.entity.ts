import { Client } from 'src/clients/client.entity';
import { InstructorWorkDetails } from '../instructors-work-details/instructor-work-details.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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

  @OneToOne(
    () => InstructorWorkDetails,
    (workDetails) => workDetails.instructor,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'work_details_id' })
  workDetails: InstructorWorkDetails;

  @Column({ name: 'active', type: 'boolean' })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
