"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const thread_controller_1 = require("./thread.controller");
const thread_service_1 = require("./thread.service");
describe('ThreadController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [thread_controller_1.ThreadController],
            providers: [thread_service_1.ThreadService],
        }).compile();
        controller = module.get(thread_controller_1.ThreadController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=thread.controller.spec.js.map