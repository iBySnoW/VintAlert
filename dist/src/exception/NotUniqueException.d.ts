import { HttpException } from '@nestjs/common';
export declare class NotUniqueException extends HttpException {
    constructor(message: string);
}
