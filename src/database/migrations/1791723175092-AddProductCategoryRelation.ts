import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductCategoryRelation1791723175092 implements MigrationInterface {
    name = 'AddProductCategoryRelation1791723175092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "category_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "quantity" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_product_quantity_nonnegative" CHECK ("quantity" >= 0)`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_product_price_nonnegative" CHECK ("price" >= 0)`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_product_price_nonnegative"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_product_quantity_nonnegative"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "quantity" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
    }

}
