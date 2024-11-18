import { Test, TestingModule } from '@nestjs/testing';
import { FilmShowService } from './film-show.service';

describe('FilmShowService', () => {
  let service: FilmShowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmShowService],
    }).compile();

    service = module.get<FilmShowService>(FilmShowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
