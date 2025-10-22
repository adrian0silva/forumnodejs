import { MigrationInterface, QueryRunner } from 'typeorm';
export default class CreateForum20251019174933 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
