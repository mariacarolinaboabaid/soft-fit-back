import { MigrationInterface, QueryRunner } from "typeorm";

export class PassTheRelationshipFkFromInstructorToWorkDetails1727874098007 implements MigrationInterface {
    name = 'PassTheRelationshipFkFromInstructorToWorkDetails1727874098007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructors" DROP CONSTRAINT "FK_04d89d7debc38ae3bbba07cfb94"`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP CONSTRAINT "REL_04d89d7debc38ae3bbba07cfb9"`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP COLUMN "work_details_id"`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" ADD "instructor_id" uuid`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" ADD CONSTRAINT "UQ_b935a9bde56fcc1eeecf4f25213" UNIQUE ("instructor_id")`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" ADD CONSTRAINT "FK_b935a9bde56fcc1eeecf4f25213" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructors_work_details" DROP CONSTRAINT "FK_b935a9bde56fcc1eeecf4f25213"`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" DROP CONSTRAINT "UQ_b935a9bde56fcc1eeecf4f25213"`);
        await queryRunner.query(`ALTER TABLE "instructors_work_details" DROP COLUMN "instructor_id"`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD "work_details_id" uuid`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD CONSTRAINT "REL_04d89d7debc38ae3bbba07cfb9" UNIQUE ("work_details_id")`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD CONSTRAINT "FK_04d89d7debc38ae3bbba07cfb94" FOREIGN KEY ("work_details_id") REFERENCES "instructors_work_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
