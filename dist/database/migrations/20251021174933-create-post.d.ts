import { MigrationInterface, QueryRunner } from 'typeorm';
export default class CreatePost20251021174933 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
