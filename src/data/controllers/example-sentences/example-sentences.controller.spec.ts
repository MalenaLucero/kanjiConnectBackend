import { Test, TestingModule } from '@nestjs/testing';
import { ExampleSentencesController } from './example-sentences.controller';

describe('ExampleSentencesController', () => {
  let controller: ExampleSentencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleSentencesController],
    }).compile();

    controller = module.get<ExampleSentencesController>(ExampleSentencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
