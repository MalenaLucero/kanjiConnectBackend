import { Test, TestingModule } from '@nestjs/testing';
import { LessonSourceController } from './lesson-source.controller';

describe('LessonSourceController', () => {
  let controller: LessonSourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonSourceController],
    }).compile();

    controller = module.get<LessonSourceController>(LessonSourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
