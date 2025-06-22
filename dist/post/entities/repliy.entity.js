"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = void 0;
const openapi = require("@nestjs/swagger");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
let Reply = class Reply {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, content: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, isActive: { required: true, type: () => Boolean }, post: { required: true, type: () => require("./post.entity").Post }, postId: { required: true, type: () => Number }, author: { required: true, type: () => require("../../users/entities/user.entity").User }, authorId: { required: true, type: () => Number } };
    }
};
exports.Reply = Reply;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reply.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Reply.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Reply.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Reply.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Reply.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.replies),
    __metadata("design:type", post_entity_1.Post)
], Reply.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Reply.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.replies),
    __metadata("design:type", user_entity_1.User)
], Reply.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Reply.prototype, "authorId", void 0);
exports.Reply = Reply = __decorate([
    (0, typeorm_1.Entity)('replies')
], Reply);
//# sourceMappingURL=repliy.entity.js.map