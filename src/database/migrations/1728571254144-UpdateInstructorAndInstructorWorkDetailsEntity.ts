import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateInstructorAndInstructorWorkDetailsEntity1728571254144 implements MigrationInterface {
    name = 'UpdateInstructorAndInstructorWorkDetailsEntity1728571254144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructors" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" ADD "rating_value" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" ADD "rating_votes_quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" ADD "currency" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD "enrollment_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD CONSTRAINT "UQ_2db0483c82650da4c7a44700dad" UNIQUE ("enrollment_number")`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD "set_inactive_on_date" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructors" DROP COLUMN "set_inactive_on_date"`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP CONSTRAINT "UQ_2db0483c82650da4c7a44700dad"`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP COLUMN "enrollment_number"`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" DROP COLUMN "rating_votes_quantity"`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" DROP COLUMN "rating_value"`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD "deleted_at" TIMESTAMP`);
    }

}
