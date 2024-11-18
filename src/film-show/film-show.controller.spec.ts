import { Test, TestingModule } from '@nestjs/testing';
import { FilmShowController } from './film-show.controller';

describe('FilmShowController', () => {
  let controller: FilmShowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmShowController],
    }).compile();

    controller = module.get<FilmShowController>(FilmShowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
