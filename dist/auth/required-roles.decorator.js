"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredRoles = void 0;
const common_1 = require("@nestjs/common");
const RequiredRoles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.RequiredRoles = RequiredRoles;
//# sourceMappingURL=required-roles.decorator.js.map