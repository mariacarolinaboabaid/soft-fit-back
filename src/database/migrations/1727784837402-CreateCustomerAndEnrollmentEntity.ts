import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomerAndEnrollmentEntity1727784837402 implements MigrationInterface {
    name = 'CreateCustomerAndEnrollmentEntity1727784837402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enrollments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "enrollment" character varying NOT NULL, "monthly_fee" double precision NOT NULL, "client_id" uuid, CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "birth_date" date NOT NULL, "fiscal_number" character varying NOT NULL, "phone" character varying NOT NULL, "card_number" character varying NOT NULL, "card_expiration_date" character varying NOT NULL, "card_safe_code" character varying NOT NULL, "card_name" character varying NOT NULL, "card_owner_fiscal_number" character varying NOT NULL, "due_date" character varying NOT NULL, "payments" jsonb, "active" boolean NOT NULL, "deliquent" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "client_id" uuid, "enrollment_id" uuid, CONSTRAINT "UQ_b2c0e6085a7061df5f572092103" UNIQUE ("username"), CONSTRAINT "UQ_c84c78fd0c5f14ebee7aa371f7b" UNIQUE ("fiscal_number"), CONSTRAINT "UQ_88acd889fbe17d0e16cc4bc9174" UNIQUE ("phone"), CONSTRAINT "UQ_8ddd51bb73f2c2e7522e1b4d141" UNIQUE ("card_number"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_67b2a2f1194cf05c66ef10a9cf1" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_0bc3de99d31ef0cbe99756022f7" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_cbee0c4b8335d64d3b60ab97407" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_cbee0c4b8335d64d3b60ab97407"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_0bc3de99d31ef0cbe99756022f7"`);
        await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_67b2a2f1194cf05c66ef10a9cf1"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "enrollments"`);
    }

}
