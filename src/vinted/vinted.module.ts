import { Module } from '@nestjs/common';
import { VintedService } from './vinted.service';
import { VintedController } from './vinted.controller';

@Module({
  controllers: [VintedController],
  providers: [VintedService],
})
export class VintedModule {}
