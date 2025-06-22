"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { content: { required: true, type: () => String }, postId: { required: true, type: () => Number } };
    }
}
exports.CreateResponseDto = CreateResponseDto;
//# sourceMappingURL=create-response.dto.js.map