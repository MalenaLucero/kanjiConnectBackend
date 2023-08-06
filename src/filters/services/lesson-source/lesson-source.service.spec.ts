import { Test, TestingModule } from '@nestjs/testing';
import { LessonSourceService } from './lesson-source.service';

describe('LessonSourceService', () => {
  let service: LessonSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonSourceService],
    }).compile();

    service = module.get<LessonSourceService>(LessonSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
