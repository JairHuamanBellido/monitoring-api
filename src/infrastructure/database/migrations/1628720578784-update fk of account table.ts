import {MigrationInterface, QueryRunner} from "typeorm";

export class updateFkOfAccountTable1628720578784 implements MigrationInterface {
    name = 'updateFkOfAccountTable1628720578784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`);
        await queryRunner.query(`ALTER TABLE "public"."account" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "public"."account" RENAME CONSTRAINT "UQ_60328bf27019ff5498c4b977421" TO "UQ_efef1e5fdbe318a379c06678c51"`);
        await queryRunner.query(`ALTER TABLE "public"."account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
        await queryRunner.query(`ALTER TABLE "public"."account" RENAME CONSTRAINT "UQ_efef1e5fdbe318a379c06678c51" TO "UQ_60328bf27019ff5498c4b977421"`);
        await queryRunner.query(`ALTER TABLE "public"."account" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
