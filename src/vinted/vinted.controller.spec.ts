import { Test, TestingModule } from '@nestjs/testing';
import { VintedController } from './vinted.controller';

describe('VintedController', () => {
  let controller: VintedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VintedController],
    }).compile();

    controller = module.get<VintedController>(VintedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
