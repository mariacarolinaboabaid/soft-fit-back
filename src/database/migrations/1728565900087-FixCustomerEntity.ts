import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCustomerEntity1728565900087 implements MigrationInterface {
    name = 'FixCustomerEntity1728565900087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "enrollment_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_92db43f2cbd884c5527f65bec87" UNIQUE ("enrollment_number")`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "currency" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "set_inactive_on_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "set_inactive_on_date"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_92db43f2cbd884c5527f65bec87"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "enrollment_number"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "deleted_at" TIMESTAMP`);
    }

}
