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
exports.PostController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const public_decorator_1 = require("../auth/public.decorator");
const create_response_dto_1 = require("./dto/create-response.dto");
const user_entity_1 = require("../users/entities/user.entity");
const token_payload_params_1 = require("../auth/params/token-payload.params");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(createPostDto) {
        return this.postService.create(createPostDto);
    }
    async findThread(id) {
        const idCorreto = id.split('.')[1];
        return this.postService.findOne(parseInt(idCorreto));
    }
    async addResponse(id, createResponseDto, user) {
        const postId = parseInt(id.split('.')[1]);
        return this.postService.addResponseToPost(postId, createResponseDto, user);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/post.entity").Post }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/post.entity").Post }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findThread", null);
__decorate([
    (0, common_1.Post)(':id/new-response'),
    openapi.ApiResponse({ status: 201, type: require("./entities/post.entity").Post }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_params_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_response_dto_1.CreateResponseDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "addResponse", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('threads'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map