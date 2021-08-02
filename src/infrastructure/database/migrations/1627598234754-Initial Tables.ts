import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTables1627598234754 implements MigrationInterface {
    name = 'InitialTables1627598234754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "lastname" character varying NOT NULL, "avatar" character varying NOT NULL, "email" character varying NOT NULL, "rol" character varying NOT NULL, "dni" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_by" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_by" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_by" character varying NOT NULL, "deleted_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_blocked" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT false, "created_by" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_by" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_by" character varying NOT NULL, "deleted_at" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "REL_60328bf27019ff5498c4b97742" UNIQUE ("userId"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
