"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const dataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrations: [__dirname + '/migrations/*.{js,ts}'],
    ssl: { rejectUnauthorized: false },
};
const dataSource = new typeorm_1.DataSource(dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source-cli.js.map