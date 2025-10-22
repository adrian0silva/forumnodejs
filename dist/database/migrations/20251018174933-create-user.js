"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateUser20251018174933 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TYPE "role_enum" AS ENUM ('ADMIN', 'MODERATOR', 'USER')
    `);
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
        await queryRunner.query(`DROP TYPE "role_enum"`);
    }
}
exports.default = CreateUser20251018174933;
//# sourceMappingURL=20251018174933-create-user.js.map