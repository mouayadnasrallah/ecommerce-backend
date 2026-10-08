import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1791306892094 implements MigrationInterface {
    name = 'InitialSchema1791306892094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'CUSTOMER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(20), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "password_hash" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'CUSTOMER', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
