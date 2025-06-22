"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPayloadDto = void 0;
const openapi = require("@nestjs/swagger");
class TokenPayloadDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { sub: { required: true, type: () => Number }, iat: { required: true, type: () => String }, exp: { required: true, type: () => String }, admin: { required: true, type: () => Boolean }, login: { required: true, type: () => String } };
    }
}
exports.TokenPayloadDto = TokenPayloadDto;
//# sourceMappingURL=token-payload.dto.js.map