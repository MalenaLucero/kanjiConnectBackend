import { Test, TestingModule } from '@nestjs/testing';
import { ExampleSentencesService } from './example-sentences.service';

describe('ExampleSentencesService', () => {
  let service: ExampleSentencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleSentencesService],
    }).compile();

    service = module.get<ExampleSentencesService>(ExampleSentencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
