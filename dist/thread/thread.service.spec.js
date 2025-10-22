"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const thread_service_1 = require("./thread.service");
describe('ThreadService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [thread_service_1.ThreadService],
        }).compile();
        service = module.get(thread_service_1.ThreadService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=thread.service.spec.js.map