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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const token_payload_params_1 = require("../auth/params/token-payload.params");
const forum_service_1 = require("./forum.service");
const create_forum_dto_1 = require("./dto/create-forum.dto");
const update_forum_dto_1 = require("./dto/update-forum.dto");
const public_decorator_1 = require("../auth/public.decorator");
const post_service_1 = require("../post/post.service");
const user_entity_1 = require("../users/entities/user.entity");
let ForumController = class ForumController {
    constructor(forumService, postService) {
        this.forumService = forumService;
        this.postService = postService;
    }
    create(createForumDto) {
        return this.forumService.create(createForumDto);
    }
    findAll() {
        return this.forumService.findAll();
    }
    findByName(forumName) {
        return this.forumService.findOneByTitle(forumName);
    }
    async findPosts(forumName) {
        const forum = await this.forumService.findOneByTitle(forumName);
        return this.postService.findAll({
            where: { forumId: forum.id },
        });
    }
    async createPost(forumName, body, user) {
        const forum = await this.forumService.findOneByTitle(forumName);
        return this.postService.create({
            ...body,
            forumId: forum.id,
            authorId: user.id
        });
    }
    update(id, updateForumDto) {
        return this.forumService.update(+id, updateForumDto);
    }
    remove(id) {
        return this.forumService.remove(+id);
    }
};
exports.ForumController = ForumController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/forum.entity").Forum }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forum_dto_1.CreateForumDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/forum.entity").Forum] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/:forumName'),
    openapi.ApiResponse({ status: 200, type: require("./entities/forum.entity").Forum }),
    __param(0, (0, common_1.Param)('forumName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "findByName", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/:forumName/posts'),
    openapi.ApiResponse({ status: 200, type: [require("../post/entities/post.entity").Post] }),
    __param(0, (0, common_1.Param)('forumName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "findPosts", null);
__decorate([
    (0, common_1.Post)('/:forumName/posts'),
    openapi.ApiResponse({ status: 201, type: require("../post/entities/post.entity").Post }),
    __param(0, (0, common_1.Param)('forumName')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_params_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "createPost", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_forum_dto_1.UpdateForumDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "remove", null);
exports.ForumController = ForumController = __decorate([
    (0, common_1.Controller)('forums'),
    __metadata("design:paramtypes", [forum_service_1.ForumService,
        post_service_1.PostService])
], ForumController);
//# sourceMappingURL=forum.controller.js.map