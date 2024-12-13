"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotUniqueException = void 0;
const common_1 = require("@nestjs/common");
class NotUniqueException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
exports.NotUniqueException = NotUniqueException;
//# sourceMappingURL=NotUniqueException.js.map