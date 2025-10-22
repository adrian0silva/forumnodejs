import { MigrationInterface, QueryRunner } from "typeorm";
export default class CreateUser20251018174933 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
