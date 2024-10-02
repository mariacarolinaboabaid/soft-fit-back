import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInstructorsAndInstructorsWorkDetailsModules1727828303036 implements MigrationInterface {
    name = 'CreateInstructorsAndInstructorsWorkDetailsModules1727828303036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "instructors_work_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hire_date" date NOT NULL, "salary" double precision NOT NULL, "due_date" date NOT NULL, "bank_payment" character varying NOT NULL, "account_payment" character varying NOT NULL, "work_hours" double precision NOT NULL, "hour_start_time" integer NOT NULL, "minute_start_time" integer NOT NULL, "hour_end_time" integer NOT NULL, "minute_end_time" integer NOT NULL, "payments" jsonb, "salary_history" jsonb, CONSTRAINT "PK_04d89d7debc38ae3bbba07cfb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instructors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "birth_date" date NOT NULL, "fiscal_number" character varying NOT NULL, "phone" character varying NOT NULL, "active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "client_id" uuid, "work_details_id" uuid, CONSTRAINT "UQ_84fb76c42c7d629a88f01be70e6" UNIQUE ("username"), CONSTRAINT "UQ_fe5492c2725c85b1efec36dd82e" UNIQUE ("fiscal_number"), CONSTRAINT "UQ_44638747d7165afe7e919fd5348" UNIQUE ("phone"), CONSTRAINT "REL_04d89d7debc38ae3bbba07cfb9" UNIQUE ("work_details_id"), CONSTRAINT "PK_95e3da69ca76176ea4ab8435098" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD CONSTRAINT "FK_5cd7a6732e3745ff3411e211bc9" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD CONSTRAINT "FK_04d89d7debc38ae3bbba07cfb94" FOREIGN KEY ("work_details_id") REFERENCES "instructors_work_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructors" DROP CONSTRAINT "FK_04d89d7debc38ae3bbba07cfb94"`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP CONSTRAINT "FK_5cd7a6732e3745ff3411e211bc9"`);
        await queryRunner.query(`DROP TABLE "instructors"`);
        await queryRunner.query(`DROP TABLE "instructors_work_details"`);
    }

}
