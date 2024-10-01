import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatesRelationsOfTheEntities1727787542808 implements MigrationInterface {
    name = 'UpdatesRelationsOfTheEntities1727787542808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_67b2a2f1194cf05c66ef10a9cf1"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_7300db57ed274a04c09a5625ace"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_0bc3de99d31ef0cbe99756022f7"`);
        await queryRunner.query(`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_67b2a2f1194cf05c66ef10a9cf1" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_7300db57ed274a04c09a5625ace" FOREIGN KEY ("statistics_id") REFERENCES "clients_statistics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_0bc3de99d31ef0cbe99756022f7" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_0bc3de99d31ef0cbe99756022f7"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_7300db57ed274a04c09a5625ace"`);
        await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_67b2a2f1194cf05c66ef10a9cf1"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_0bc3de99d31ef0cbe99756022f7" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_7300db57ed274a04c09a5625ace" FOREIGN KEY ("statistics_id") REFERENCES "clients_statistics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_67b2a2f1194cf05c66ef10a9cf1" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
