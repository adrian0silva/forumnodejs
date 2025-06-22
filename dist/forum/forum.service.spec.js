"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const forum_service_1 = require("./forum.service");
describe('ForumService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [forum_service_1.ForumService],
        }).compile();
        service = module.get(forum_service_1.ForumService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=forum.service.spec.js.map