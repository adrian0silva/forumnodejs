import { MigrationInterface, QueryRunner } from 'typeorm';
export default class CreateThread20251020174933 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
