import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClientEntity1727441690359 implements MigrationInterface {
    name = 'CreateClientEntity1727441690359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "businessName" character varying NOT NULL, "fiscalNumber" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "currency" character varying NOT NULL, CONSTRAINT "UQ_a1f18729c66b74e45314ddc1171" UNIQUE ("businessName"), CONSTRAINT "UQ_b9b7323f28ee18f02c42ac07803" UNIQUE ("fiscalNumber"), CONSTRAINT "UQ_a95860aa92d1420e005893043de" UNIQUE ("username"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
