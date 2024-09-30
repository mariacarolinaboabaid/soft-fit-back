import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientStatisticsEntity1727719459701
  implements MigrationInterface
{
  name = 'CreateClientStatisticsEntity1727719459701';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clients_statistics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_customers" integer NOT NULL, "total_deliquent_customers" integer NOT NULL, "total_deliquency_amount" double precision NOT NULL, "total_renewed_enrollments" integer NOT NULL, "total_new_enrollments" integer NOT NULL, "total_canceled_enrollments" integer NOT NULL, "total_premium_enrollments" integer NOT NULL, "total_basic_enrollments" integer NOT NULL, CONSTRAINT "PK_7300db57ed274a04c09a5625ace" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "UQ_a1f18729c66b74e45314ddc1171"`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "businessName"`);
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "UQ_b9b7323f28ee18f02c42ac07803"`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "fiscalNumber"`);
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "business_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "UQ_cb54cc2d58501989f34d6713bab" UNIQUE ("business_name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "fiscal_number" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "UQ_a9fce850cba9c16da162dc9e7d1" UNIQUE ("fiscal_number")`,
    );
    await queryRunner.query(`ALTER TABLE "clients" ADD "statistics_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "UQ_7300db57ed274a04c09a5625ace" UNIQUE ("statistics_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_7300db57ed274a04c09a5625ace" FOREIGN KEY ("statistics_id") REFERENCES "clients_statistics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "FK_7300db57ed274a04c09a5625ace"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "UQ_7300db57ed274a04c09a5625ace"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "statistics_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "UQ_a9fce850cba9c16da162dc9e7d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "fiscal_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "UQ_cb54cc2d58501989f34d6713bab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "business_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "fiscalNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "UQ_b9b7323f28ee18f02c42ac07803" UNIQUE ("fiscalNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "businessName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "UQ_a1f18729c66b74e45314ddc1171" UNIQUE ("businessName")`,
    );
    await queryRunner.query(`DROP TABLE "clients_statistics"`);
  }
}
