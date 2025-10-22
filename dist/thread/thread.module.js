"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadModule = void 0;
const common_1 = require("@nestjs/common");
const thread_service_1 = require("./thread.service");
const thread_controller_1 = require("./thread.controller");
const thread_entity_1 = require("./entities/thread.entity");
const typeorm_1 = require("@nestjs/typeorm");
const post_module_1 = require("../post/post.module");
let ThreadModule = class ThreadModule {
};
exports.ThreadModule = ThreadModule;
exports.ThreadModule = ThreadModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([thread_entity_1.Thread]), post_module_1.PostModule],
        controllers: [thread_controller_1.ThreadController],
        providers: [thread_service_1.ThreadService],
    })
], ThreadModule);
//# sourceMappingURL=thread.module.js.map