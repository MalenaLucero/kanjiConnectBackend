import { Test, TestingModule } from '@nestjs/testing';
import { ExpressionsController } from './expressions.controller';

describe('ExpressionsController', () => {
  let controller: ExpressionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpressionsController],
    }).compile();

    controller = module.get<ExpressionsController>(ExpressionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
