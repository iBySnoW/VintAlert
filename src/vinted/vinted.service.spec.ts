import { Test, TestingModule } from '@nestjs/testing';
import { VintedService } from './vinted.service';

describe('VintedService', () => {
  let service: VintedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VintedService],
    }).compile();

    service = module.get<VintedService>(VintedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
