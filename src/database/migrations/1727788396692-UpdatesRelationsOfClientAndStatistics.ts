import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatesRelationsOfClientAndStatistics1727788396692 implements MigrationInterface {
    name = 'UpdatesRelationsOfClientAndStatistics1727788396692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_7300db57ed274a04c09a5625ace"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_7300db57ed274a04c09a5625ace" FOREIGN KEY ("statistics_id") REFERENCES "clients_statistics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_7300db57ed274a04c09a5625ace"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_7300db57ed274a04c09a5625ace" FOREIGN KEY ("statistics_id") REFERENCES "clients_statistics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
