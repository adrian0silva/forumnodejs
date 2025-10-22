import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUser20251018174933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação do enum role
    await queryRunner.query(`
      CREATE TYPE "role_enum" AS ENUM ('ADMIN', 'MODERATOR', 'USER')
    `);

    // Criação da tabela users
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'username',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'text',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'image',
            type: 'text',
            isNullable: true,
            default: null,
          },
          {
            name: 'role',
            type: 'role_enum',
            isNullable: false,
            default: `'USER'`,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.query(`DROP TYPE "role_enum"`);
  }
}
