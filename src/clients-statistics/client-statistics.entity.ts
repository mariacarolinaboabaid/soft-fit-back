/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clients_statistics' })
export class ClientStatistics {

 @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: "total_customers", type: "int" })
  totalCustomers: number;

  @Column({ name: "total_deliquent_customers", type: "int" })
  totalDeliquentCustomers: number;

  @Column({ name: "total_deliquency_amount", type: "float" })
  totalDeliquencyAmount: number;

  @Column({ name: "total_renewed_enrollments", type: "int" })
  totalRenewedEnrollments: number;

  @Column({ name: "total_new_enrollments", type: "int" })
  totalNewEnrollments: number;

  @Column({ name: "total_canceled_enrollments", type: "int" })
  totalCanceledEnrollments: number;

  @Column({ name: "total_premium_enrollments", type: "int" })
  totalPremiumEnrollments: number;

  @Column({ name: "total_basic_enrollments", type: "int" })
  totalBasicEnrollments: number;
}
