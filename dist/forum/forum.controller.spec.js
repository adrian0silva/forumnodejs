"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const forum_controller_1 = require("./forum.controller");
const forum_service_1 = require("./forum.service");
describe('ForumController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [forum_controller_1.ForumController],
            providers: [forum_service_1.ForumService],
        }).compile();
        controller = module.get(forum_controller_1.ForumController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=forum.controller.spec.js.map