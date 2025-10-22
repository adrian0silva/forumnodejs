"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateForum20251019174933 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'forums',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'category',
                    type: 'enum',
                    enum: ['GAMES', 'ESPORTE', 'IDIOMAS', 'TECNOLOGIA', 'VALE_TUDO'],
                    default: `'VALE_TUDO'`,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('forums');
    }
}
exports.default = CreateForum20251019174933;
//# sourceMappingURL=20251019174933-create-forum.js.map