import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCustomerEntityInactiveDateType1728566250052 implements MigrationInterface {
    name = 'FixCustomerEntityInactiveDateType1728566250052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "set_inactive_on_date"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "set_inactive_on_date" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "set_inactive_on_date"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "set_inactive_on_date" TIMESTAMP`);
    }

}
